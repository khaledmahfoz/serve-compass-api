# Serve Compass - Restaurant Management API Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack Documentation](#technical-stack-documentation)
   - [Core Framework](#core-framework)
   - [Database Layer](#database-layer)
   - [Storage Service](#storage-service)
   - [Background Jobs](#background-jobs)
3. [API Design Patterns](#api-design-patterns)
4. [Integration Points](#integration-points)
5. [Development & Deployment](#development--deployment)
6. [Security Considerations](#security-considerations)
7. [Performance Optimization](#performance-optimization)
8. [Error Handling Patterns](#error-handling-patterns)
9. [Code Organization](#code-organization)

---

## Project Overview

### High-Level Summary

**Serve Compass** is a comprehensive NestJS-based REST API designed for restaurant management systems. It provides a robust backend infrastructure for managing products, categories, branches, staff members, users, and roles. The architecture follows modern Node.js best practices with strong typing through TypeScript, clean architecture principles, and extensive tooling for development and deployment.

### Main Purpose and Capabilities

The API serves as the central backend for web and mobile front-ends, providing:

- **Authentication & Authorization**
  - Email/password based authentication with bcrypt hashing
  - Google OAuth 2.0 integration for social login
  - Role-based access control (RBAC) with dynamic role assignment
  - Session management using Redis with express-session

- **Product & Category Management**
  - Full CRUD operations for products and categories
  - Image upload and deletion via S3-compatible storage (Backblaze B2)
  - Automatic ordering and soft delete capabilities
  - Category-product relationships with validation

- **User & Role Management**
  - User lifecycle management (create, read, update, delete)
  - Dynamic role assignment and management
  - Email verification workflows
  - Password reset and change functionality
  - Profile image management

- **Infrastructure & Tooling**
  - PostgreSQL database with TypeORM ORM
  - Redis for caching and session storage
  - BullMQ for background job processing
  - Winston logging with daily rotation
  - Email service via Nodemailer with Pug templates
  - API documentation via Swagger/Scalar
  - Docker containerization for development and production

---

## Technical Stack Documentation

### Core Framework

#### NestJS Architecture Patterns

**Module-Based Architecture**
The application follows NestJS's modular architecture with feature-based modules:

```typescript
// src/main.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
    CacheModule.registerAsync(RedisOptionsProvider),
    MailerModule.forRootAsync(MailerOptionsProvider),
    BullModule.forRootAsync(BullOptionsProvider),
    HealthModule,
    AuthModule,
    UsersModule,
    RolesModule,
    RolesManagementModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RolesInterceptor,
    },
  ],
})
export class MainModule {}
```

**Module Structure Pattern:**
Each feature module contains:

- `*.module.ts` - Module definition with imports/providers
- `*.controller.ts` - HTTP request handlers
- `*.service.ts` - Business logic implementation
- `dtos/*.ts` - Data Transfer Objects
- `docs/*.ts` - Swagger documentation decorators

#### Dependency Injection Implementation

NestJS's built-in DI system is used throughout the application with constructor injection:

```typescript
@Injectable()
export class ProductsService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly mediaService: MediaService,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: ICreateProduct): Promise<IProduct> {
    await this.categoriesService.exists(createProductDto.categoryId);
    const product = this.productsRepository.create(createProductDto);
    // ... implementation
  }
}
```

**Custom Providers:**

- Database configuration via async factory providers
- Redis options with connection management
- BullMQ queue configuration
- Mailer service with template adapter

#### Project Structure and Organization

```
src/
├── entities/                 # TypeORM entities
│   ├── user.ts
│   ├── role.ts
│   ├── user-role.ts
│   ├── product.ts
│   └── category.ts
├── lib/                      # Shared libraries
│   ├── constants/           # Application constants
│   ├── decorators/          # Custom decorators
│   ├── dtos/               # Shared DTOs
│   ├── filters/            # Exception filters
│   ├── guards/             # Auth guards
│   ├── interceptors/       # Response interceptors
│   ├── messages/           # Error messages
│   ├── processors/         # BullMQ job processors
│   ├── providers/          # Configuration providers
│   ├── services/           # Shared services
│   ├── templates/          # Email templates (Pug)
│   └── utils/              # Utility functions
├── modules/                 # Feature modules
│   ├── auth/              # Authentication module
│   ├── users/             # User management
│   ├── roles/             # Role definitions
│   ├── roles-management/  # Role assignment
│   ├── categories/        # Category management
│   ├── products/          # Product management
│   └── health/            # Health checks
├── migrations/              # Database migrations
├── types/                  # Type definitions
│   ├── enums/            # Enumerations
│   └── interfaces/       # TypeScript interfaces
├── docs/                  # Additional documentation
├── main.ts                # Application bootstrap
└── main.module.ts         # Root module
```

**Path Aliases (tsconfig.json):**

```json
{
  "paths": {
    "@modules/*": ["src/modules/*"],
    "@auth/*": ["src/modules/auth/*"],
    "@guards/*": ["src/modules/auth/guards/*"],
    "@strategies/*": ["src/modules/auth/strategies/*"],
    "@interfaces/*": ["src/types/interfaces/*"],
    "@lib/*": ["src/lib/*"],
    "@entities/*": ["src/entities/*"],
    "@enums/*": ["src/types/enums/*"]
  }
}
```

---

### Database Layer (TypeORM + PostgreSQL)

#### Database Connection Configuration

**Async Configuration Pattern:**

```typescript
// src/lib/database/database.config.ts
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: configService.getOrThrow<'postgres'>('DATABASE_TYPE'),
    host: configService.getOrThrow<string>('DATABASE_HOST'),
    port: configService.getOrThrow<number>('DATABASE_PORT'),
    username: configService.getOrThrow<string>('DATABASE_USER_NAME'),
    password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    database: configService.getOrThrow<string>('DATABASE_NAME'),
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    migrationsRun: true,
    entities: ['dist/entities/*{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
  };
};
```

**Provider Pattern:**

```typescript
// src/lib/database/database.provider.ts
export default async function databaseFactoryProvider(): Promise<DatabaseFactoryAsyncOptions> {
  return {
    name: 'default',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        ...getDatabaseConfig(configService),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });

      await dataSource.initialize();
      return dataSource;
    },
    inject: [ConfigService],
  };
}
```

#### Entity Relationships and Mapping Strategies

**User Entity with One-to-One Relationship:**

```typescript
@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: 'enum', enum: AuthProvidersEnum })
  provider: AuthProvidersEnum;

  @OneToOne(() => UserRole, (userRole) => userRole.user, {
    onDelete: 'CASCADE',
  })
  userRole?: UserRole | null;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @CreateDateColumn()
  joinedAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;
}
```

**Many-to-One Relationship (Product → Category):**

```typescript
@Entity()
@Unique(['name'])
@Unique(['order'])
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category | null;

  // ... other fields
}
```

**Role Entity with One-to-Many Relationship:**

```typescript
@Entity()
@Unique(['type'])
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RolesTypeEnum })
  type: RolesTypeEnum;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @Column({ type: 'text', default: '' })
  description?: string;
}
```

#### Repository Patterns and Data Access Layer Design

**Service Layer with Repository Injection:**

```typescript
@Injectable()
export class ProductsService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly mediaService: MediaService,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getProducts(
    getProductsQueryDto: IGetProductsQuery,
  ): Promise<WithPaginationMetadata<IProduct[]>> {
    const { page, limit } = getProductsQueryDto;
    const [products, total] = await this.productsRepository.findAndCount({
      skip: constructSkip(page, limit),
      take: limit,
    });
    // ... additional processing
  }

  async createProduct(createProductDto: ICreateProduct): Promise<IProduct> {
    await this.categoriesService.exists(createProductDto.categoryId);
    const product = this.productsRepository.create(createProductDto);
    product.updatedBy = createProductDto.createdBy;
    if (!createProductDto.order) {
      product.order = await constructMaximumOrder(this.productsRepository);
    }
    await this.productsRepository.insert(product);
    return product;
  }
}
```

**Pagination Utility:**

```typescript
export function constructSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function constructPaginationMetaData(
  page: number,
  limit: number,
  total: number,
): IPaginationMetaData {
  return {
    page,
    perPage: limit,
    total,
    lastPage: Math.ceil(total / limit),
  };
}
```

#### Migration Strategies and Management

**Migration Configuration:**

```typescript
synchronize: false,
migrationsRun: true,
migrations: ['dist/migrations/*{.ts,.js}'],
```

**Migration Workflow:**

- **Auto-run on startup**: Migrations automatically execute when application starts
- **Version control**: All schema changes tracked via migration files
- **Environment consistency**: Same migration system for development and production
- **No auto-sync**: Schema synchronization disabled to prevent accidental data loss

**Development Migration Commands:**

```bash
# Generate a new migration (requires a custom name)
yarn dev:migration:generate --name=AddNewFieldToUserTable

# Create an empty migration file
yarn dev:migration:create --name=CustomMigration

# Run pending migrations
yarn dev:migration:run

# Revert the last migration
yarn dev:migration:revert

# Show migration status
yarn dev:migration:show
```

**Production Migration Commands:**

```bash
# Generate a new migration (run after build)
yarn migration:generate

# Create an empty migration file
yarn migration:create

# Run pending migrations
yarn migration:run

# Revert the last migration
yarn migration:revert

# Show migration status
yarn migration:show
```

**TypeORM CLI Data Source:**

The TypeORM CLI uses `src/lib/database/data-source.ts` for migration management:

```typescript
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { getDatabaseConfig } from './database.config';

config();

export default new DataSource(
  getDatabaseConfig(new ConfigService()) as DataSourceOptions,
);
```

#### Query Optimization Approaches

**Efficient Queries with Pagination:**

```typescript
async getCategories(
  getCategoriesQueryDto: IGetCategoriesQuery,
): Promise<WithPaginationMetadata<ICategory[]>> {
  const { page, limit } = getCategoriesQueryDto;
  const [categories, total] = await this.categoriesRepository.findAndCount({
    skip: constructSkip(page, limit),
    take: limit,
  });
  // ... mapping logic
}
```

**Selective Field Loading:**

```typescript
async getCategory(id: string): Promise<ICategory> {
  const category = await this.categoriesRepository.findOneBy({ id });
  if (!category) {
    throw new NotFoundException('Category not found');
  }
  category.image = constructImageFullPath(category.image);
  return category;
}
```

#### Transaction Handling Patterns

Currently using direct repository operations. Transaction patterns can be implemented using TypeORM's `QueryRunner`:

```typescript
// Example transaction pattern (not currently implemented)
async transferFunds(fromId: string, toId: string, amount: number) {
  await this.dataSource.transaction(async (manager) => {
    await manager.update(User, fromId, { balance: () => `balance - ${amount}` });
    await manager.update(User, toId, { balance: () => `balance + ${amount}` });
  });
}
```

---

### Storage Service (Backblaze S3 SDK)

#### S3 Client Configuration and Initialization

**MediaService with Backblaze B2 Configuration:**

```typescript
@Injectable()
export class MediaService {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly folderName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow<string>('B2_BUCKET_NAME');
    this.folderName = this.configService.getOrThrow<string>('B2_FOLDER_NAME');

    this.s3 = new S3Client({
      endpoint: this.configService.getOrThrow<string>('B2_ENDPOINT'),
      region: this.configService.getOrThrow<string>('B2_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('B2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'B2_SECRET_ACCESS_KEY',
        ),
      },
    });
  }
}
```

#### Media Upload Workflows and Endpoints

**Image Upload Controller Pattern:**

```typescript
@Post(':id/image')
@UseGuards(AuthorizationGuard)
@UseInterceptors(FileInterceptor('image'))
async uploadUserImage(
  @Param('id', ParseUUIDPipe) id: string,
  @UploadedFile(createImageUploadOptions())
  image: Express.Multer.File,
): Promise<void> {
  return this.usersService.uploadUserImage(id, image);
}
```

**File Validation:**

```typescript
export function createImageUploadOptions(options?: {
  maxSize?: number;
  fileType?: string;
}): ParseFilePipe {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: options?.maxSize || 3 * 1000 * 1000, // 3MB default
      }),
      new FileTypeValidator({
        fileType: options?.fileType || 'image/(jpeg|png|webp)',
      }),
    ],
  });
}
```

#### File Handling Strategies

**Image Compression with Sharp:**

```typescript
async compressImage(image: Express.Multer.File): Promise<Buffer> {
  return sharp(image.buffer)
    .toFormat('webp', {
      quality: 80,
    })
    .toBuffer();
}
```

**Upload Implementation:**

```typescript
async uploadImage(
  image: Express.Multer.File,
  keyName: string,
): Promise<string> {
  try {
    const compressedBuffer = await this.compressImage(image);
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${this.folderName}/${keyName}.webp`,
        Body: compressedBuffer,
      }),
    );
    return `${keyName}.webp`;
  } catch (error) {
    if (error instanceof S3ServiceException) {
      throw new HttpException(
        error.message,
        error.$metadata.httpStatusCode ?? 500,
      );
    }
    throw new InternalServerErrorException(error.message);
  }
}
```

#### URL Generation for Public/Private Access

**Image Path Construction:**

```typescript
export function constructImageFullPath(
  imagePath: string | null,
): string | null {
  if (!imagePath) return null;
  const configService = new ConfigService();
  const b2Endpoint = configService.getOrThrow<string>('B2_ENDPOINT');
  const b2BucketName = configService.getOrThrow<string>('B2_BUCKET_NAME');
  const b2FolderName = configService.getOrThrow<string>('B2_FOLDER_NAME');
  return `${b2Endpoint}/${b2BucketName}/${b2FolderName}/${imagePath}`;
}
```

#### Error Handling for Storage Operations

**Comprehensive Error Handling:**

```typescript
try {
  const compressedBuffer = await this.compressImage(image);
  await this.s3.send(
    new PutObjectCommand({
      Bucket: this.bucketName,
      Key: `${this.folderName}/${keyName}.webp`,
      Body: compressedBuffer,
    }),
  );
  return `${keyName}.webp`;
} catch (error) {
  if (error instanceof S3ServiceException) {
    throw new HttpException(
      error.message,
      error.$metadata.httpStatusCode ?? 500,
    );
  }
  throw new InternalServerErrorException(error.message);
}
```

#### File Metadata Management

**Key Naming Convention:**

```typescript
// User images: `users/{userId}.webp`
// Product images: `products/{productId}.webp`
// Category images: `categories/{categoryId}.webp`

const keyName = `products/${id}`;
const imagePath = await this.mediaService.uploadImage(image, keyName);
await this.productsRepository.update(id, { image: imagePath });
```

#### Cleanup and Deletion Strategies

**Deletion Implementation:**

```typescript
async removeImage(keyName: string): Promise<void> {
  await this.s3.send(
    new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: `${this.folderName}/${keyName}.webp`,
    }),
  );
}

// Service layer usage
async deleteProductImage(id: string): Promise<void> {
  const keyName = `products/${id}`;
  await this.mediaService.removeImage(keyName);
  await this.productsRepository.update(id, { image: null });
}
```

---

### Background Jobs (BullMQ)

#### Queue Configuration and Setup

**BullMQ Configuration Provider:**

```typescript
export const BullOptionsProvider: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      connection: {
        host: configService.getOrThrow<string>('REDIS_HOST'),
        port: configService.getOrThrow<number>('REDIS_PORT'),
        password: configService.getOrThrow<string>('REDIS_PASSWORD'),
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        retryStrategy: (times) => {
          return Math.min(times * 1000, 10000);
        },
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    };
  },
  inject: [ConfigService],
};
```

#### Job Types and Purposes

**Email Processing Queue:**

- `sendVerificationEmail` - Send email verification tokens
- `sendUpdateEmail` - Notify users of email changes
- `sendUpdatePassword` - Send password reset tokens
- `passwordUpdated` - Confirm password changes

#### Job Processing Strategies

**Email Processor Implementation:**

```typescript
@Processor('emailQueue')
export class EmailProcessor extends WorkerHost {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async process(job: Job<{ email: string; token: string }>): Promise<void> {
    switch (job.name) {
      case 'sendVerificationEmail': {
        const { email, token } = job.data;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Email verification',
          template: 'email-verification',
          context: {
            verificationLink: `${this.configService.getOrThrow<string>(
              'CLIENT_BASE_URL',
            )}/auth/verify-email/${token}`,
          },
        });
        break;
      }
      case 'sendUpdateEmail': {
        const { email } = job.data;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Email updated',
          template: 'email-updated',
          context: { email },
        });
        break;
      }
      case 'sendUpdatePassword': {
        const { email, token } = job.data;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Reset password',
          template: 'reset-password',
          context: {
            email,
            resetPasswordLink: `${this.configService.getOrThrow<string>(
              'CLIENT_BASE_URL',
            )}/auth/reset-password/${token}`,
          },
        });
        break;
      }
      case 'passwordUpdated': {
        const { email } = job.data;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Password updated',
          template: 'password-updated',
          context: { email },
        });
        break;
      }
    }
  }
}
```

#### Error Handling and Retry Mechanisms

**Retry Configuration:**

```typescript
defaultJobOptions: {
  removeOnComplete: true,
  removeOnFail: false,
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
}
```

- **Exponential backoff**: 1s, 2s, 4s, 8s, 16s
- **Max attempts**: 5 retries before marking as failed
- **Cleanup**: Completed jobs removed, failed jobs retained for debugging

#### Job Monitoring and Observability

**Redis Connection Retry Strategy:**

```typescript
retryStrategy: (times) => {
  return Math.min(times * 1000, 10000);
},
```

#### Queue Event Handling

**Job Dispatch Pattern:**

```typescript
async register(registerDto: IRegister): Promise<void> {
  // ... user creation logic
  const token = await this.tokensService.setEmailVerificationToken(email);
  await this.emailQueue.add('sendVerificationEmail', { email, token });
}

async changePassword(
  userId: string,
  changePasswordDto: IChangePassword,
): Promise<void> {
  // ... password update logic
  await this.emailQueue.add('passwordUpdated', {
    email: currentUser.email,
  });
}
```

---

## API Design Patterns

### RESTful Endpoint Conventions

**Resource-Based URL Structure:**

```
GET    /auth/register           - Register new user
POST   /auth/login              - User login
DELETE /auth/logout             - User logout
GET    /users/:id              - Get user by ID
PATCH  /users/:id              - Update user
DELETE /users/:id              - Delete user
POST   /users/:id/image        - Upload user image
DELETE /users/:id/image        - Delete user image
GET    /products               - Get all products (paginated)
POST   /products               - Create product
GET    /products/:id           - Get product by ID
PATCH  /products/:id           - Update product
DELETE /products/:id           - Delete product
POST   /products/:id/image     - Upload product image
DELETE /products/:id/image     - Delete product image
```

**HTTP Status Codes:**

- `200 OK` - Successful GET request
- `201 Created` - Resource created (with Location header)
- `204 No Content` - Successful PATCH/DELETE
- `302 Found` - OAuth redirects
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Unique constraint violations
- `500 Internal Server Error` - Server errors

### Request/Response DTOs

**Class-Based DTOs with Validation:**

```typescript
export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Burger' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product price', example: 15.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Product calories', example: 500 })
  @IsInt()
  @IsPositive()
  calories: number;

  @ApiProperty({
    description: 'Product description',
    example: 'Delicious burger',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Category ID', example: 'uuid' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'Product order', example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({ description: 'Product active status', example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Created by user ID', example: 'uuid' })
  @IsUUID()
  createdBy: string;
}
```

**Pagination DTO:**

```typescript
export class GetProductsQueryDto {
  @ApiProperty({ description: 'Page number', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'Items per page', example: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
```

### Validation Strategies

**Global Validation Pipe Configuration:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
```

**File Upload Validation:**

```typescript
export function createImageUploadOptions(options?: {
  maxSize?: number;
  fileType?: string;
}): ParseFilePipe {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: options?.maxSize || 3 * 1000 * 1000,
      }),
      new FileTypeValidator({
        fileType: options?.fileType || 'image/(jpeg|png|webp)',
      }),
    ],
  });
}
```

### Authentication/Authorization Patterns

**Authentication Guard:**

```typescript
@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return !!request.user;
  }
}
```

**Roles Guard:**

```typescript
@Injectable()
export class RolesGuard extends AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rolesManagementService: RolesManagementService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = await super.canActivate(context);
    if (!parentCanActivate) return false;

    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const sessionUser = request.user as ISerializedUser;

    const userRole = await this.rolesManagementService.getUserRole(
      sessionUser?.id,
    );

    const hasRole = roles.some((role) => userRole === role);
    if (!hasRole) throw new ForbiddenException();

    return true;
  }
}
```

**Role Decorator:**

```typescript
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Usage
@UseGuards(RolesGuard)
@Roles(RolesTypeEnum.ADMIN, RolesTypeEnum.MODERATOR)
@Post()
async createProduct(@Body() createProductDto: CreateProductDto): Promise<void> {
  // ... implementation
}
```

### Error Handling and Exception Filters

**Global Unique Constraint Filter:**

```typescript
@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(
    exception: QueryFailedError & { driverError?: UniqueConstraintError },
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.driverError?.code === '23505') {
      const detail = exception.driverError.detail ?? '';
      const match = /Key \((.*)\)=\((.*)\) already exists/.exec(detail);
      if (match) {
        const keyNames = match[1].split(', ');
        const keyValues = match[2].split(', ');

        const messages = keyNames.map((name, index) => {
          const fieldName = name.trim();
          const stringWithoutQuotes = fieldName.replace(/(^"|"$)/g, '');
          const fieldValue = keyValues[index]?.trim() || '';
          return `${stringWithoutQuotes} with value '${fieldValue}' already exists`;
        });

        const errorResponse: IError = {
          statusCode: HttpStatus.CONFLICT,
          message: messages.length > 1 ? messages : messages[0],
          error: 'Conflict',
        };

        response.status(HttpStatus.CONFLICT).send(errorResponse);
        return;
      }
    }

    throw exception;
  }
}
```

### Logging and Monitoring Approach

**Winston Logger Configuration:**

```typescript
export const logger = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          const date = new Date().toLocaleString('en-US', {
            timeZone: 'Africa/Cairo',
          });
          return `${colorizer.colorize('context', `[${info.context}]`)}\t[${info.level}] ${colorizer.colorize('date', `[${date}]`)}  ${info.message}`;
        }),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/debug-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'debug',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      zippedArchive: true,
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '7d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
} satisfies WinstonModuleOptions;
```

**Custom Error Levels:**

```typescript
const errorLevels = {
  levels: {
    fatal: 0,
    error: 1,
    verbose: 2,
    warn: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bold red',
    error: 'red',
    verbose: 'italic yellow',
    warn: 'italic yellow',
    info: 'blue',
    debug: 'bold green',
    context: 'bold magenta',
    date: 'bold cyan',
  },
};
```

### API Versioning Strategy

**Multi-Server Configuration:**

```typescript
export async function setupDocs(app: NestExpressApplication): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle('Serve compass')
    .setDescription('Resturant management service')
    .setVersion('1.0')
    .addServer('/')
    .addServer('/api')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('ref', app, document);

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'default',
      metaData: {
        title: 'Serve Compass',
      },
      presistAuth: true,
    } satisfies NestJSReferenceConfiguration),
  );

  app.use('/api-docs', expressStatic(join(process.cwd(), 'documentation')));
}
```

---

## Integration Points

### External Service Configurations

**Configuration Service Pattern:**
All external services are configured through environment variables using NestJS ConfigModule:

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseFactoryProvider),
    CacheModule.registerAsync(RedisOptionsProvider),
    MailerModule.forRootAsync(MailerOptionsProvider),
    BullModule.forRootAsync(BullOptionsProvider),
    // ...
  ],
})
```

### Environment Variables and Configuration Management

**Required Environment Variables:**

```bash
# Application
NODE_ENV=production
PORT=3000
CLIENT_BASE_URL=https://example.com

# Database
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER_NAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=serve_compass

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=password
REDIS_USERNAME=
REDIS_TTL=86400000

# Backblaze B2 Storage
B2_ENDPOINT=https://s3.us-west-004.backblazeb2.com
B2_REGION=us-west-004
B2_BUCKET_NAME=bucket-name
B2_FOLDER_NAME=uploads
B2_ACCESS_KEY_ID=key-id
B2_SECRET_ACCESS_KEY=secret-key

# Email Service
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=email@gmail.com
MAIL_PASSWORD=password
MAIL_FROM=noreply@example.com

# Session
SESSION_SECRET=secret-key
SESSION_TTL=86400000

# Documentation
SWAGGER_ENABLED=true
```

### Service Health Checks

**Health Endpoint:**

```typescript
@Controller('health')
export class HealthController {
  @Get()
  getHealth(): IHealth {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
```

### Rate Limiting Strategies

Currently not implemented. Can be added using `@nestjs/throttler`:

```typescript
// Future implementation
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
})
```

### Caching Strategies

**Redis Cache Configuration:**

```typescript
export const RedisOptionsProvider: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('RedisOptionsProvider');
    try {
      const store = await redisStore({
        socket: {
          host: configService.get<string>('REDIS_HOST'),
          port: Number.parseInt(configService.get<string>('REDIS_PORT')!),
        },
        password: configService.get('REDIS_PASSWORD'),
        username: configService.get('REDIS_USERNAME'),
      });
      logger.log('Redis connection was successful');
      return {
        store: () => store,
      };
    } catch (error) {
      logger.error(`Redis connection error: ${error}`);
      throw new InternalServerErrorException('Redis connection error');
    }
  },
  inject: [ConfigService],
};
```

**Session Storage in Redis:**

```typescript
export async function setupSessions(app: INestApplication): Promise<void> {
  const redisClient = createClient({
    username: process.env.REDIS_USERNAME!,
    password: process.env.REDIS_PASSWORD!,
    socket: {
      host: process.env.REDIS_HOST!,
      port: Number.parseInt(process.env.REDIS_PORT!),
    },
  });

  await redisClient.connect().catch(() => {
    throw new InternalServerErrorException('Redis connection error');
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sessions:',
    disableTouch: true,
    ttl: Number.parseInt(process.env.REDIS_TTL!),
  });

  const isProduction = process.env.NODE_ENV === 'production';

  app.use(
    session({
      store: redisStore,
      genid: (req: Request) => {
        const randomId = crypto.randomBytes(16).toString('hex');
        return `${randomId}/user/${(req.user as ISerializedUser)?.id}`;
      },
      name: 'sid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      proxy: true,
      cookie: {
        path: '/',
        httpOnly: isProduction,
        secure: isProduction,
        maxAge: Number.parseInt(process.env.SESSION_TTL!),
        sameSite: 'lax',
      },
    }),
  );
}
```

**Token Service for Email Verification:**

```typescript
@Injectable()
export class TokensService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setToken(key: string, value: string, ttl: number = 0): Promise<string> {
    const token = randomUUID();
    await this.cacheManager.set(`${key}:${token}`, value, ttl);
    return token;
  }

  async setEmailVerificationToken(email: string): Promise<string> {
    return this.setToken(`email-verification-tokens`, email, 24 * 60 * 60);
  }

  async setPasswordUpdateToken(email: string): Promise<string> {
    return this.setToken(`password-update-tokens`, email, 24 * 60 * 60);
  }
}
```

---

## Development & Deployment

### Local Development Setup Requirements

**Prerequisites:**

- Node.js (22-alpine3.21 recommended)
- Yarn package manager
- Docker & Docker Compose
- PostgreSQL (via Docker)
- Redis (via Docker)

**Installation Steps:**

```bash
# Clone repository
git clone <repository-url>
cd serve-compass

# Install dependencies
yarn install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development environment
yarn start:dev
```

### Docker Configuration

**Development Docker Compose:**

```yaml
version: '3.8'
networks:
  serve-compass:
services:
  db:
    image: postgres:15-alpine
    container_name: serve-compass-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DATABASE_USER_NAME}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
      POSTGRES_DB: ${DATABASE_NAME}
      PGDATA: /var/lib/postgresql/data
    ports:
      - '${DATABASE_PORT}:5432'
    healthcheck:
      test:
        ['CMD-SHELL', 'pg_isready -U ${DATABASE_USER_NAME} -d ${DATABASE_NAME}']
      interval: 10s
      timeout: 5s
      retries: 3
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - serve-compass

  cache:
    image: redis:7-alpine
    container_name: serve-compass-cache
    restart: unless-stopped
    environment:
      REDIS_PASSWORD: ${REDIS_PASSWORD}
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - '${REDIS_PORT}:6379'
    healthcheck:
      test: ['CMD', 'redis-cli', '--raw', 'incr', 'ping']
      interval: 10s
      timeout: 5s
      retries: 3
    volumes:
      - redis_data:/data
    networks:
      - serve-compass

volumes:
  postgres_data:
  redis_data:
```

**Production Docker Compose:**

```yaml
version: '3.8'
services:
  serve-compass-api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: serve-compass-api
    restart: unless-stopped
    expose:
      - '3000'
    ports:
      - '3000:3000'
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    container_name: serve-compass-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DATABASE_USER_NAME}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
      POSTGRES_DB: ${DATABASE_NAME}
      PGDATA: /var/lib/postgresql/data
    healthcheck:
      test:
        ['CMD-SHELL', 'pg_isready -U ${DATABASE_USER_NAME} -d ${DATABASE_NAME}']
      interval: 10s
      timeout: 5s
      retries: 3
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    container_name: serve-compass-cache
    restart: unless-stopped
    environment:
      REDIS_PASSWORD: ${REDIS_PASSWORD}
    command: redis-server --requirepass ${REDIS_PASSWORD}
    healthcheck:
      test: ['CMD', 'redis-cli', '--raw', 'incr', 'ping']
      interval: 10s
      timeout: 5s
      retries: 3
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Dockerfile:**

```dockerfile
# Example (actual file should be read from dockerfile)
FROM node:22-alpine3.21

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
```

### Testing Strategies

**Test Configuration (package.json):**

```json
{
  "scripts": {
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
}
```

**Jest Configuration:**

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": ["**/*.(t|j)s"],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
}
```

**Testing Guidelines:**

- Unit tests for individual services and utilities
- Integration tests for API endpoints
- E2E tests for complete workflows
- Coverage reports for quality metrics
- Watch mode for TDD development

### CI/CD Pipeline Considerations

**Husky Git Hooks (lint-staged):**

```json
{
  "lint-staged": {
    "*.{ts}": ["eslint --fix", "prettier --write", "git add"],
    "*.{md}": ["yarn docs:build", "git add"]
  }
}
```

**Recommended CI/CD Steps:**

1. Checkout code
2. Install dependencies (`yarn install`)
3. Run linters (`yarn lint`)
4. Run tests (`yarn test:cov`)
5. Build application (`yarn build`)
6. Build Docker image
7. Run security scans
8. Deploy to staging/production

### Monitoring and Alerting Setup

**Logging Strategy:**

- Winston for application logging
- Daily log rotation for file management
- Separate error and debug logs
- Colorized console output for development
- JSON format for production logs
- Log levels: fatal, error, verbose, warn, info, debug

**Health Monitoring:**

- `/health` endpoint for basic health checks
- Database connection monitoring
- Redis connection monitoring
- Queue job monitoring (via Bull Board UI)

**Future Monitoring Enhancements:**

- Application Performance Monitoring (APM) with New Relic or DataDog
- Error tracking with Sentry
- Metrics collection with Prometheus
- Alerting based on error rates and response times

---

## Security Considerations

### Data Encryption Strategies

**Password Hashing:**

```typescript
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const isPasswordValid = await bcrypt.compare(password, hashedPassword);
```

**Session Security:**

```typescript
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: true,
    cookie: {
      path: '/',
      httpOnly: isProduction,
      secure: isProduction,
      maxAge: Number.parseInt(process.env.SESSION_TTL!),
      sameSite: 'lax',
    },
  }),
);
```

### Input Sanitization

**Validation Pipe:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
```

**File Upload Validation:**

```typescript
export function createImageUploadOptions(options?: {
  maxSize?: number;
  fileType?: string;
}): ParseFilePipe {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: options?.maxSize || 3 * 1000 * 1000,
      }),
      new FileTypeValidator({
        fileType: options?.fileType || 'image/(jpeg|png|webp)',
      }),
    ],
  });
}
```

### CORS Configuration

```typescript
const clientUrl = app.get(ConfigService).getOrThrow<string>('CLIENT_BASE_URL');

app.enableCors({
  origin: [clientUrl],
  credentials: true,
});
```

### Security Headers

**Session Cookie Configuration:**

```typescript
cookie: {
  path: '/',
  httpOnly: isProduction,  // Prevents XSS attacks
  secure: isProduction,    // HTTPS only in production
  maxAge: Number.parseInt(process.env.SESSION_TTL!),
  sameSite: 'lax',         // CSRF protection
}
```

**Additional Security Headers (future implementation):**

```typescript
// Add helmet for additional security headers
import helmet from 'helmet';

app.use(helmet());
```

### API Key/Token Management

**Session-Based Authentication:**

- Express-session with Redis storage
- Session IDs stored in HTTP-only cookies
- Session expiration configuration
- Rolling sessions for extended sessions

**Token-Based Verification:**

```typescript
@Injectable()
export class TokensService {
  async setEmailVerificationToken(email: string): Promise<string> {
    return this.setToken(`email-verification-tokens`, email, 24 * 60 * 60);
  }

  async setPasswordUpdateToken(email: string): Promise<string> {
    return this.setToken(`password-update-tokens`, email, 24 * 60 * 60);
  }
}
```

**Security Best Practices:**

- Tokens expire after 24 hours
- UUID-based tokens for uniqueness
- Secure storage in Redis
- Immediate deletion after use

---

## Performance Optimization

### Database Indexing Strategies

**Entity Indexes:**

```typescript
@Entity()
@Unique(['email'])
@Unique(['name'])
@Unique(['order'])
export class User implements IUser {
  // ... fields
}

@Entity()
@Unique(['type'])
export class Role implements IRole {
  // ... fields
}
```

**Indexing Guidelines:**

- Unique constraints on email, name, order fields
- Primary keys using UUID
- Foreign key relationships with proper indexes
- Composite unique constraints for user-role relationships

### Query Optimization Techniques

**Pagination Implementation:**

```typescript
async getProducts(
  getProductsQueryDto: IGetProductsQuery,
): Promise<WithPaginationMetadata<IProduct[]>> {
  const { page, limit } = getProductsQueryDto;
  const [products, total] = await this.productsRepository.findAndCount({
    skip: constructSkip(page, limit),
    take: limit,
  });
  // ... additional processing
}
```

**Efficient Field Selection:**

```typescript
async getCategory(id: string): Promise<ICategory> {
  const category = await this.categoriesRepository.findOneBy({ id });
  // Single query by primary key
}
```

**Optimization Strategies:**

- Use `findAndCount` for paginated queries
- Select specific fields when possible
- Avoid N+1 queries with proper relations
- Use database indexes for frequent queries
- Implement query result caching

### Caching Implementation

**Redis Cache Layer:**

```typescript
@Injectable()
export class TokensService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setToken(key: string, value: string, ttl: number = 0): Promise<string> {
    const token = randomUUID();
    await this.cacheManager.set(`${key}:${token}`, value, ttl);
    return token;
  }

  getToken(key: string): Promise<string | undefined> {
    return this.cacheManager.get<string>(key);
  }
}
```

**Session Caching:**

```typescript
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sessions:',
  disableTouch: true,
  ttl: Number.parseInt(process.env.REDIS_TTL!),
});
```

**Caching Use Cases:**

- Email verification tokens (24h TTL)
- Password reset tokens (24h TTL)
- User sessions (configurable TTL)
- Future: Query result caching for frequently accessed data

### Concurrency Handling

**BullMQ Job Queue:**

```typescript
defaultJobOptions: {
  removeOnComplete: true,
  removeOnFail: false,
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
}
```

**Concurrency Strategies:**

- Background job processing for email sending
- Exponential backoff for failed jobs
- Multiple job processors (email queue)
- Queue-based task distribution
- Connection pooling via TypeORM

### Memory Management

**Image Compression:**

```typescript
async compressImage(image: Express.Multer.File): Promise<Buffer> {
  return sharp(image.buffer)
    .toFormat('webp', {
      quality: 80,
    })
    .toBuffer();
}
```

**Memory Optimization Techniques:**

- Stream-based file processing (where applicable)
- Image compression before upload
- Buffer management for file uploads
- Log rotation to prevent disk exhaustion
- Redis memory management with TTL

---

## Error Handling Patterns

### Global Exception Filters

**Unique Constraint Filter:**

```typescript
@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(
    exception: QueryFailedError & { driverError?: UniqueConstraintError },
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.driverError?.code === '23505') {
      const detail = exception.driverError.detail ?? '';
      const match = /Key \((.*)\)=\((.*)\) already exists/.exec(detail);
      if (match) {
        const keyNames = match[1].split(', ');
        const keyValues = match[2].split(', ');

        const messages = keyNames.map((name, index) => {
          const fieldName = name.trim();
          const stringWithoutQuotes = fieldName.replace(/(^"|"$)/g, '');
          const fieldValue = keyValues[index]?.trim() || '';
          return `${stringWithoutQuotes} with value '${fieldValue}' already exists`;
        });

        const errorResponse: IError = {
          statusCode: HttpStatus.CONFLICT,
          message: messages.length > 1 ? messages : messages[0],
          error: 'Conflict',
        };

        response.status(HttpStatus.CONFLICT).send(errorResponse);
        return;
      }
    }

    throw exception;
  }
}
```

### Business Logic Exceptions

**Custom Exception Patterns:**

```typescript
async validateUser(email: string, password: string): Promise<IUser> {
  const user = await this.usersService.findUserByEmail(email);
  if (!user?.password)
    throw new UnauthorizedException(
      AuthenticationMessages.INVALID_CREDENTIALS,
    );
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new UnauthorizedException(
      AuthenticationMessages.INVALID_CREDENTIALS,
    );
  return user;
}

async exists(
  id: string,
  { noThrow = false }: { noThrow?: boolean } = {},
): Promise<boolean> {
  const category = await this.categoriesRepository.exists({
    where: { id },
  });
  if (!noThrow && !category) {
    throw new NotFoundException('Category not found');
  }
  return !!category;
}
```

### Database Error Handling

**Global Filter for Database Errors:**

```typescript
@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
  // Handles PostgreSQL unique constraint violations (code 23505)
  // Provides user-friendly error messages
  // Falls back to standard exception for other errors
}
```

### External Service Error Handling

**Storage Service Error Handling:**

```typescript
async uploadImage(
  image: Express.Multer.File,
  keyName: string,
): Promise<string> {
  try {
    const compressedBuffer = await this.compressImage(image);
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${this.folderName}/${keyName}.webp`,
        Body: compressedBuffer,
      }),
    );
    return `${keyName}.webp`;
  } catch (error) {
    if (error instanceof S3ServiceException) {
      throw new HttpException(
        error.message,
        error.$metadata.httpStatusCode ?? 500,
      );
    }
    throw new InternalServerErrorException(error.message);
  }
}
```

**Redis Connection Error Handling:**

```typescript
export const RedisOptionsProvider: CacheModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('RedisOptionsProvider');
    try {
      const store = await redisStore({
        // ... configuration
      });
      logger.log('Redis connection was successful');
      return { store: () => store };
    } catch (error) {
      logger.error(`Redis connection error: ${error}`);
      throw new InternalServerErrorException('Redis connection error');
    }
  },
};
```

### Graceful Degradation Strategies

**Queue Job Retry Logic:**

```typescript
defaultJobOptions: {
  removeOnComplete: true,
  removeOnFail: false,
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
}
```

**Service Availability Checks:**

```typescript
async getCategory(id: string): Promise<ICategory> {
  const category = await this.categoriesRepository.findOneBy({ id });
  if (!category) {
    throw new NotFoundException('Category not found');
  }
  // ... processing
}
```

**Fallback Strategies:**

- Failed jobs retained for debugging
- Connection retries for Redis
- Database connection pooling
- Comprehensive error logging
- User-friendly error messages

---

## Code Organization

### Module Structure

**Feature Module Pattern:**

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
```

**Module Organization:**

- Each feature in its own module
- Clear separation of concerns
- Reusable services exported
- Proper dependency injection

### Shared Utilities and Helpers

**Utility Functions:**

```typescript
// Pagination utilities
export function constructSkip(page: number, limit: number): number;
export function constructPaginationMetaData(
  page: number,
  limit: number,
  total: number,
): IPaginationMetaData;
export function constructMaximumOrder(
  repository: Repository<any>,
): Promise<number>;

// Image utilities
export function constructImageFullPath(imagePath: string | null): string | null;
export function createImageUploadOptions(options?: {
  maxSize?: number;
  fileType?: string;
}): ParseFilePipe;

// Session utilities
export async function setupSessions(app: INestApplication): Promise<void>;
export function logout(req: Request, res: Response): void;

// Documentation utilities
export async function setupDocs(app: NestExpressApplication): Promise<void>;
```

### Constants and Configuration Files

**Application Constants:**

```typescript
// src/lib/constants/salt-rounds.ts
export const saltRounds = 10;

// src/lib/constants/per-page-limit.ts
export const PER_PAGE_LIMIT = 100;
```

**Configuration Providers:**

```typescript
// Database configuration
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions;

// Redis configuration
export const RedisOptionsProvider: CacheModuleAsyncOptions;

// BullMQ configuration
export const BullOptionsProvider: SharedBullAsyncConfiguration;

// Mailer configuration
export const MailerOptionsProvider: MailerAsyncOptions;
```

### Type Definitions and Interfaces

**Interface Structure:**

```typescript
// src/types/interfaces/
├── users/
│   ├── user.ts
│   ├── update-user.ts
│   └── serialized-user.ts
├── products/
│   ├── product.ts
│   ├── create-product.ts
│   ├── update-product.ts
│   └── get-products-query.ts
├── categories/
│   ├── category.ts
│   ├── create-category.ts
│   └── get-categories-query.ts
├── auth/
│   ├── login.ts
│   ├── register.ts
│   ├── change-password.ts
│   └── change-email.ts
├── roles/
│   └── role.ts
└── helpers/
    ├── pagination-metadata.ts
    ├── with-pagination-metadata.ts
    └── error.ts
```

**Enumerations:**

```typescript
// src/types/enums/
├── roles-type.ts (ADMIN, MODERATOR, USER)
└── auth-providers.ts (LOCAL, GOOGLE)
```

**DTO Patterns:**

```typescript
export interface IProduct {
  id: string;
  name: string;
  price: number;
  order: number;
  categoryId: string;
  category: Category | null;
  calories: number;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  image: string | null;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

---

## Additional Technical Details

### Response Serialization

**Role-Based Serialization:**

```typescript
@Injectable()
export class RolesInterceptor extends ClassSerializerInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    return next.handle().pipe(
      map(async (data: PlainLiteralObject | Array<PlainLiteralObject>) => {
        const role = await this.rolesManagementService.getUserRole(
          request.user?.id,
        );
        const groups = role ? [role as string] : [];
        const options: ClassSerializerContextOptions = { groups };
        if (serializeOptions?.type) {
          options.type = serializeOptions.type;
        }
        return this.serialize(data, options);
      }),
    );
  }
}
```

**Serializer Decorator:**

```typescript
export const Serializer = (
  options: ClassSerializerContextOptions,
): CustomDecorator<string> => SetMetadata('serializer', options);

// Usage
@Serializer({ type: UserDto })
@Get(':id')
async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
  return this.usersService.getUser(id);
}
```

### Email Templates

**Pug Template Structure:**

```
src/lib/templates/
├── email-verification.pug
├── email-updated.pug
├── reset-password.pug
└── password-updated.pug
```

**Mailer Configuration:**

```typescript
export const MailerOptionsProvider: MailerAsyncOptions = {
  useFactory: async (config: ConfigService) => ({
    transport: {
      host: config.getOrThrow<string>('MAIL_HOST'),
      port: config.getOrThrow<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: config.getOrThrow<string>('MAIL_USER'),
        pass: config.getOrThrow<string>('MAIL_PASSWORD'),
      },
    },
    defaults: { from: config.getOrThrow<string>('MAIL_FROM') },
    template: {
      dir: cwd() + '/templates',
      adapter: new PugAdapter(),
      options: { strict: true },
    },
    verifyTransporters: true,
  }),
};
```

### Session Management

**Session ID Generation:**

```typescript
genid: (req: Request) => {
  const randomId = crypto.randomBytes(16).toString('hex');
  return `${randomId}/user/${(req.user as ISerializedUser)?.id}`;
},
```

**Session Cleanup:**

```typescript
@Injectable()
export class SessionsService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async deleteUserSessions(userId: string): Promise<void> {
    const pattern = `sessions:*/user/${userId}`;
    const keys = await this.cacheManager.store.keys(pattern);
    if (keys.length > 0) await this.cacheManager.store.mdel(...keys);
  }
}
```

---

## Conclusion

This documentation provides a comprehensive overview of the Serve Compass restaurant management API architecture, technical implementation, and best practices. The system follows modern NestJS patterns with strong emphasis on:

- **Clean Architecture**: Modular design with clear separation of concerns
- **Type Safety**: Comprehensive TypeScript interfaces and DTOs
- **Security**: Password hashing, secure sessions, input validation, CORS protection
- **Performance**: Caching, pagination, image compression, efficient queries
- **Scalability**: Background job processing, connection pooling, containerization
- **Maintainability**: Clear code organization, comprehensive logging, error handling
- **Developer Experience**: Hot reloading, documentation, type checking, linting

The API is production-ready with Docker support, health checks, and monitoring capabilities. Future enhancements may include rate limiting, additional caching layers, APM integration, and enhanced monitoring/alerting systems.

---

**Document Version:** 1.0
**Last Updated:** 2025-03-20
**Maintained By:** Development Team
