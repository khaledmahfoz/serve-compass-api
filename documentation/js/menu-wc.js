'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">serve-compass documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#additional-pages"'
                            : 'data-bs-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/introduction.html" data-type="entity-link" data-context-id="additional">introduction</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' :
                                            'id="xs-controllers-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' :
                                        'id="xs-injectables-links-module-AuthModule-41839614814f92bfb2a2fc3fa050f94ef72ad02264061f7417141586823ee941e28727ac978e7ea0968900928e0aee0680e7f029eb6a9de9a3bcabe1467b6952"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionSerializer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionSerializer</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokensService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokensService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' :
                                            'id="xs-controllers-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' :
                                        'id="xs-injectables-links-module-CategoriesModule-8d7b59126dd5c030c25f9400c524b0e912e33710eecb784cefcd7f29fd1d84c3b24dadda2ec9dba43b67244aa9f13f0bfa1d50a81c69e6991a42a134c6a783e6"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link" >MainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MainModule-81b520fad1d3422b4812aca764bb7b5228ad460dc2977e5938fc7649eb48eac3a1dcc9a2305711848c9634bf207c28e1cd009eb0dee60eff75064a3e78e37d51"' : 'data-bs-target="#xs-injectables-links-module-MainModule-81b520fad1d3422b4812aca764bb7b5228ad460dc2977e5938fc7649eb48eac3a1dcc9a2305711848c9634bf207c28e1cd009eb0dee60eff75064a3e78e37d51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MainModule-81b520fad1d3422b4812aca764bb7b5228ad460dc2977e5938fc7649eb48eac3a1dcc9a2305711848c9634bf207c28e1cd009eb0dee60eff75064a3e78e37d51"' :
                                        'id="xs-injectables-links-module-MainModule-81b520fad1d3422b4812aca764bb7b5228ad460dc2977e5938fc7649eb48eac3a1dcc9a2305711848c9634bf207c28e1cd009eb0dee60eff75064a3e78e37d51"' }>
                                        <li class="link">
                                            <a href="injectables/RolesInterceptor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesInterceptor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' :
                                            'id="xs-controllers-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' :
                                        'id="xs-injectables-links-module-ProductsModule-15338ce4f4839f7e318a4999a2a9b6acca40242377f9336fd8a8e7d888e254b88679c0db1e46549deb28346bfd92c00c07c6ea61c3a64927d7ec86404c78060b"' }>
                                        <li class="link">
                                            <a href="injectables/MediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesManagementModule.html" data-type="entity-link" >RolesManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' : 'data-bs-target="#xs-controllers-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' :
                                            'id="xs-controllers-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' }>
                                            <li class="link">
                                                <a href="controllers/RolesManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' : 'data-bs-target="#xs-injectables-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' :
                                        'id="xs-injectables-links-module-RolesManagementModule-12b10314299d520e5b678c79f6cf1b99f64f14acd5c7af1d0be00a4c906934f9b050e0b4f8c1c6cb6dc282f7bb57b59263a834bab615bc3f561435d275b8a27c"' }>
                                        <li class="link">
                                            <a href="injectables/RolesManagementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesManagementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokensService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokensService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' :
                                            'id="xs-controllers-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' :
                                        'id="xs-injectables-links-module-RolesModule-7e6402b63da9936f0d2bacce14708bb9bbd5c168700efb66870747c2a31ec1b9e95366ebfde305e44d4bc52ec354fa74c082785b8f9368e7e4777b35ccac4b0c"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' :
                                            'id="xs-controllers-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' :
                                        'id="xs-injectables-links-module-UsersModule-362398e50f29d008b5c99fa30ad3696d5558632627350c0b14d6ca170cde5b7697c064d49565861a89c0f80fad21629d355f1326952161771012d90c90feb41a"' }>
                                        <li class="link">
                                            <a href="injectables/MediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesManagementController.html" data-type="entity-link" >RolesManagementController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserRole.html" data-type="entity-link" >UserRole</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddUserRoleDto.html" data-type="entity-link" >AddUserRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssignableRolesDto.html" data-type="entity-link" >AssignableRolesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasePaginatedDto.html" data-type="entity-link" >BasePaginatedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseSerializer.html" data-type="entity-link" >BaseSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDto.html" data-type="entity-link" >CategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeEmailDto.html" data-type="entity-link" >ChangeEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailProcessor.html" data-type="entity-link" >EmailProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorDto.html" data-type="entity-link" >ErrorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCategoriesQueryDto.html" data-type="entity-link" >GetCategoriesQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsQueryDto.html" data-type="entity-link" >GetProductsQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersRolesQueryDto.html" data-type="entity-link" >GetUsersRolesQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatchConstraint.html" data-type="entity-link" >MatchConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedCategoriesDto.html" data-type="entity-link" >PaginatedCategoriesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedProductsDto.html" data-type="entity-link" >PaginatedProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationMetadataDto.html" data-type="entity-link" >PaginationMetadataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDto.html" data-type="entity-link" >ProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendUpdatePasswordDto.html" data-type="entity-link" >SendUpdatePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendVerifyEmailDto.html" data-type="entity-link" >SendVerifyEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UniqueConstraintFilter.html" data-type="entity-link" >UniqueConstraintFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserRoleDto.html" data-type="entity-link" >UpdateUserRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRole.html" data-type="entity-link" >UserRole</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthorizationGuard.html" data-type="entity-link" >AuthorizationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleGuard.html" data-type="entity-link" >GoogleGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MediaService.html" data-type="entity-link" >MediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesInterceptor.html" data-type="entity-link" >RolesInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesManagementService.html" data-type="entity-link" >RolesManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionSerializer.html" data-type="entity-link" >SessionSerializer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionsService.html" data-type="entity-link" >SessionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokensService.html" data-type="entity-link" >TokensService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ICategory.html" data-type="entity-link" >ICategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IChangeEmail.html" data-type="entity-link" >IChangeEmail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IChangePassword.html" data-type="entity-link" >IChangePassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateCategory.html" data-type="entity-link" >ICreateCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateProduct.html" data-type="entity-link" >ICreateProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IError.html" data-type="entity-link" >IError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetCategoriesQuery.html" data-type="entity-link" >IGetCategoriesQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetProductsQuery.html" data-type="entity-link" >IGetProductsQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link" >ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationMetaData.html" data-type="entity-link" >IPaginationMetaData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProduct.html" data-type="entity-link" >IProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProviderUser.html" data-type="entity-link" >IProviderUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegister.html" data-type="entity-link" >IRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRole.html" data-type="entity-link" >IRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISendVerifyEmail.html" data-type="entity-link" >ISendVerifyEmail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISerializedUser.html" data-type="entity-link" >ISerializedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateCategory.html" data-type="entity-link" >IUpdateCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateProduct.html" data-type="entity-link" >IUpdateProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateUser.html" data-type="entity-link" >IUpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserRole.html" data-type="entity-link" >IUserRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UniqueConstraintError.html" data-type="entity-link" >UniqueConstraintError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WithPaginationMetadata.html" data-type="entity-link" >WithPaginationMetadata</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});