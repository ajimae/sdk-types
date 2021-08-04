export declare type JsonObject<T = unknown> = {
    [key: string]: T;
};
export declare type Nullable<T> = T | null;
export declare type Credentials = {
    clientId: string;
    clientSecret: string;
    anonymousId?: string;
};
export declare type MethodType = 'ACL' | 'BIND' | 'CHECKOUT' | 'CONNECT' | 'COPY' | 'DELETE' | 'GET' | 'HEAD' | 'LINK' | 'LOCK' | 'M-SEARCH' | 'MERGE' | 'MKACTIVITY' | 'MKCALENDAR' | 'MKCOL' | 'MOVE' | 'NOTIFY' | 'OPTIONS' | 'PATCH' | 'POST' | 'PROPFIND' | 'PROPPATCH' | 'PURGE' | 'PUT' | 'REBIND' | 'REPORT' | 'SEARCH' | 'SOURCE' | 'SUBSCRIBE' | 'TRACE' | 'UNBIND' | 'UNLINK' | 'UNLOCK' | 'UNSUBSCRIBE';
export declare type QueryParam = string | string[] | number | number[] | boolean | boolean[] | undefined;
export declare type VariableMap = {
    [key: string]: QueryParam;
};
export declare type RequestOptions = {
    [key: string]: any;
};
export declare type executeRequest = (request: ClientRequest) => Promise<ClientResponse>;
export declare type HttpErrorType = {
    name: string;
    message: string;
    code: number;
    status: number;
    statusCode: number;
    originalRequest: ClientRequest;
    body?: JsonObject;
    retryCount?: number;
    headers?: JsonObject<string>;
};
export declare type MiddlewareRequest = ClientRequest;
export declare type MiddlewareResponse = {
    resolve(response: JsonObject): void;
    reject(error: JsonObject): void;
    body?: JsonObject;
    error?: HttpErrorType;
    statusCode: number;
    headers?: JsonObject<string>;
    request?: JsonObject;
};
export declare type Dispatch = (request: MiddlewareRequest, response: MiddlewareResponse) => unknown;
export declare type Middleware = (next: Dispatch) => Dispatch;
export interface ClientRequest {
    baseUri?: string;
    uri?: string;
    headers?: VariableMap;
    method: MethodType;
    uriTemplate?: string;
    pathVariables?: VariableMap;
    queryParams?: VariableMap;
    body?: any;
}
export declare type ClientResponse<T = any> = {
    body?: T;
    statusCode?: number;
    headers?: JsonObject<string>;
    error?: HttpErrorType;
    request?: Object;
};
export declare type AuthRequest = {
    uri: string;
    body: string;
    basicAuth: string;
    authType: string;
    headers?: JsonObject<string>;
};
export declare type SuccessResult = {
    body: {
        results: JsonObject<JsonObject<string>>;
        count: number;
    };
    statusCode: number;
    headers?: JsonObject<string>;
};
export declare type ClientResult = SuccessResult | HttpErrorType;
export declare type ProcessFn = (result: SuccessResult) => Promise<any>;
export declare type ProcessOptions = {
    accumulate?: boolean;
    total?: number;
};
export declare type Client = {
    execute: (request: ClientRequest) => Promise<any>;
    process: (request: ClientRequest, fn: ProcessFn, processOpt: ProcessOptions) => Promise<any>;
};
export declare type ValiadateOption = {
    allowedMethods: MethodType;
};
export declare type ClientOptions = {
    middlewares: Array<Middleware>;
};
export declare type AuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: Credentials;
    scopes?: Array<string>;
    oauthUri?: string;
    fetch?: typeof fetch;
    tokenCache?: TokenCache;
};
export declare type AuthOptions = {
    host: string;
    token?: string;
    authType?: string;
    projectKey?: string;
    disableRefreshToken?: boolean;
    credentials: {
        clientId: string;
        clientSecret: string;
    };
    headers?: JsonObject<string>;
    scopes?: Array<string>;
    fetch?: typeof fetch;
};
export declare type CustomAuthOptions = {
    host?: string;
    token?: string;
    authType?: string;
    projectKey?: string;
    disableRefreshToken?: boolean;
    credentials?: {
        clientId: string;
        clientSecret: string;
    };
    headers?: JsonObject<string>;
    scopes?: Array<string>;
    fetch?: typeof fetch;
};
export declare type TokenInfo = {
    refresh_token: string;
    access_token: string;
    expires_at: number;
    expires_in: number;
    scope?: string;
    token_type?: string;
};
export declare type AnonymousAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
        anonymousId: string;
    };
    scopes?: Array<string>;
    oauthUri?: string;
    fetch?: typeof fetch;
    tokenCache?: TokenCache;
};
export declare type RefreshAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
    };
    refreshToken: string;
    oauthUri?: string;
    fetch?: typeof fetch;
};
export declare type Task = {
    request: MiddlewareRequest;
    response: MiddlewareResponse;
    next: Next;
};
export declare type RequestState = boolean;
export declare type TokenStore = {
    token: string;
    expirationTime: number;
    refreshToken?: string;
};
export declare type TokenCacheOptions = {
    clientId: string;
    projectKey: string;
    host: string;
};
export declare type TokenCache = {
    get: (tokenCacheOptions?: TokenCacheOptions) => TokenStore;
    set: (cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) => void;
};
declare type requestBaseOptions = {
    response: MiddlewareResponse;
    url: string;
    body: string;
    basicAuth: string;
    pendingTasks: Array<Task>;
    requestState: {
        get: () => RequestState;
        set: (requestState: RequestState) => void;
    };
    tokenCache: TokenCache;
    tokenCacheKey?: TokenCacheOptions;
};
export declare type executeRequestOptions = requestBaseOptions & {
    fetcher: typeof fetch;
};
export declare type AuthMiddlewareBaseOptions = requestBaseOptions & {
    request: MiddlewareRequest;
    fetch?: typeof fetch;
};
export declare type UserAuthOptions = {
    username: string;
    password: string;
};
export declare type ClientAuthOptions = {
    clientId: string;
    clientSecret: string;
};
export declare type PasswordAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
        user: UserAuthOptions;
    };
    scopes?: Array<string>;
    oauthUri?: string;
    fetch?: typeof fetch;
};
export declare type HttpMiddlewareOptions = {
    host: string;
    credentialsMode?: 'omit' | 'same-origin' | 'include';
    includeHeaders?: boolean;
    includeResponseHeaders?: boolean;
    includeOriginalRequest?: boolean;
    maskSensitiveHeaderData?: boolean;
    timeout?: number;
    enableRetry?: boolean;
    retryConfig?: {
        maxRetries?: number;
        retryDelay?: number;
        backoff?: boolean;
        maxDelay?: number;
    };
    fetch?: typeof fetch;
    abortController?: AbortController;
    getAbortController?: () => AbortController;
};
export declare type QueueMiddlewareOptions = {
    concurrency: number;
};
export declare type UserAgentMiddlewareOptions = {
    libraryName?: string;
    libraryVersion?: string;
    contactUrl?: string;
    contactEmail?: string;
};
export declare type Next = (request: MiddlewareRequest, response: MiddlewareResponse) => unknown;
export declare type ServiceBuilderDefaultParams = {
    expand: Array<string>;
    searchKeywords: Array<{
        lang: string;
        value: string;
    }>;
    pagination: {
        page: number | null;
        perPage: number | null;
        sort: Array<string>;
        withTotal: boolean | null;
    };
    id?: string | null;
    staged?: boolean;
    priceCurrency?: string;
    priceCountry?: string;
    priceCustomerGroup?: string;
    priceChannel?: string;
    query?: {
        operator: 'and' | 'or';
        where: Array<string>;
    };
    location?: {
        country?: string;
        currency?: string;
        state?: string;
    };
    search?: {
        facet: Array<string>;
        filter: Array<string>;
        filterByQuery: Array<string>;
        filterByFacets: Array<string>;
        fuzzy: boolean;
        fuzzyLevel: number;
        markMatchingVariants: boolean;
        text: {
            lang: string;
            value: string;
        } | null;
    };
    version?: number;
    customerId?: string;
    cartId?: string;
    dataErasure?: string;
    applyOrderEditTo?: string;
};
export declare type ServiceBuilderParams = {
    expand?: Array<string>;
    id?: string | null;
    key?: string | null;
    customerId?: string | null;
    cartId?: string | null;
    sort: Array<{
        by: string;
        direction: 'asc' | 'desc';
    }>;
    page: number | null;
    perPage: number | null;
    withTotal: boolean | null;
    staged?: boolean;
    priceCurrency?: string;
    priceCountry?: string;
    priceCustomerGroup?: string;
    priceChannel?: string;
    text?: {
        language?: string;
        value?: string;
    } | null;
    fuzzy?: boolean;
    fuzzyLevel?: number;
    markMatchingVariants?: boolean;
    facet?: Array<string>;
    filter?: Array<string>;
    filterByQuery?: Array<string>;
    filterByFacets?: Array<string>;
    searchKeywords?: Array<{
        language: string;
        value: string;
    }>;
    where?: Array<string>;
    whereOperator?: 'and' | 'or';
    country?: string;
    currency?: string;
    state?: string;
    version?: string;
    dataErasure?: string;
    applyOrderEditTo?: boolean;
    container?: string | null;
    orderNumber?: number;
};
export declare type ServiceBuilder = {
    type: string;
    features: Array<string>;
    params: ServiceBuilderDefaultParams;
    build(): string;
};
export declare type ServiceBuilderDefinition = {
    type: string;
    endpoint: string;
    features: Array<string>;
};
export declare type ServiceBuilderInstance = {
    withVersion: (version: number) => Object;
    withFullDataErasure(): Object;
    where: (predicate: string) => Object;
    whereOperator: (option: string) => Object;
    sort: (option: string) => Object;
    page: (page: number) => Object;
    perPage: (amount: number) => Object;
    withTotal(value: boolean): Object;
    byId: (id: string) => Object;
    byKey: (key: string) => Object;
    byCustomerId: (id: string) => Object;
    byCartId: (id: string) => Object;
    expand: (string: string) => Object;
    build(): string;
    parse(): string;
};
export declare type ApiRequestBuilder = {
    [key: string]: ServiceBuilder;
};
export declare type HttpUserAgentOptions = {
    name: string;
    version?: string;
    libraryName?: string;
    libraryVersion?: string;
    contactUrl?: string;
    contactEmail?: string;
};
export declare type UpdateAction = {
    action: string;
    [key: string]: any;
};
export declare type SyncAction = {
    buildActions: (now: Object, before: Object) => Array<UpdateAction>;
};
export declare type SyncActionConfig = {
    shouldOmitEmptyString: boolean;
};
export declare type ActionGroup = {
    type: string;
    group: 'ignore' | 'allow';
};
export declare type ExistingTokenMiddlewareOptions = {
    force?: boolean;
};
export declare type CorrelationIdMiddlewareOptions = {
    generate: () => string;
};
export interface IClientBuilder {
    withProjectKey: (key: string) => IClientBuilder;
    defaultClient: (baseUri: string, credentials: Credentials, oauthUri?: string, projectKey?: string) => IClientBuilder;
    withAuthMiddleware: (authMiddleware: Middleware) => IClientBuilder;
    withClientCredentialsFlow: (options: AuthMiddlewareOptions) => IClientBuilder;
    withPasswordFlow: (options: PasswordAuthMiddlewareOptions) => IClientBuilder;
    withAnonymousSessionFlow: (options: AnonymousAuthMiddlewareOptions) => IClientBuilder;
    withRefreshTokenFlow: (options: RefreshAuthMiddlewareOptions) => IClientBuilder;
    withMiddleware: (middleware: Middleware) => IClientBuilder;
    withHttpMiddleware: (options: HttpMiddlewareOptions) => IClientBuilder;
    withUserAgentMiddleware: (options: UserAgentMiddlewareOptions) => IClientBuilder;
    withQueueMiddleware: (options: QueueMiddlewareOptions) => IClientBuilder;
    withLoggerMiddleware: () => IClientBuilder;
    withCorrelationIdMiddleware: (options: CorrelationIdMiddlewareOptions) => IClientBuilder;
    withExistingTokenFlow: (authorization: string, options: ExistingTokenMiddlewareOptions) => IClientBuilder;
    build: () => Client;
}
export {};
