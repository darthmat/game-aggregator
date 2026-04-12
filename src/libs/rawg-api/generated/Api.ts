/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Position {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
}

export interface Person {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /**
   * Image
   * @format uri
   */
  image?: string;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Games count */
  games_count?: number;
}

export interface PersonSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /**
   * Image
   * @format uri
   */
  image?: string;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /** Games count */
  games_count?: number;
  /** Reviews count */
  reviews_count?: number;
  /**
   * Rating
   * @format decimal
   */
  rating?: string;
  /** Rating top */
  rating_top?: number;
  /**
   * Updated
   * @format date-time
   */
  updated?: string;
}

export interface Developer {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
}

export interface DeveloperSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Description */
  description?: string;
}

export interface Game {
  /** ID */
  id?: number;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Released
   * @format date
   */
  released?: string;
  /** TBA */
  tba?: boolean;
  /**
   * Background image
   * @format uri
   */
  background_image?: string;
  /** Rating */
  rating: number;
  /** Rating top */
  rating_top?: number;
  /** Ratings */
  ratings?: object;
  /** Ratings count */
  ratings_count?: number;
  /** Reviews text count */
  reviews_text_count?: string;
  /** Added */
  added?: number;
  /** Added by status */
  added_by_status?: object;
  /** Metacritic */
  metacritic?: number;
  /**
   * Playtime
   * in hours
   */
  playtime?: number;
  /** Suggestions count */
  suggestions_count?: number;
  /**
   * Updated
   * @format date-time
   */
  updated?: string;
  esrb_rating?: {
    id?: number;
    slug?:
      | "everyone"
      | "everyone-10-plus"
      | "teen"
      | "mature"
      | "adults-only"
      | "rating-pending";
    name?:
      | "Everyone"
      | "Everyone 10+"
      | "Teen"
      | "Mature"
      | "Adults Only"
      | "Rating Pending";
  } | null;
  platforms?: {
    platform?: {
      id?: number;
      slug?: string;
      name?: string;
    };
    released_at?: string | null;
    requirements?: {
      minimum?: string;
      recommended?: string;
    } | null;
  }[];
}

export interface GamePersonList {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /**
   * Image
   * @format uri
   */
  image?: string;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Games count */
  games_count?: number;
}

/** @example {"image":"@image.jpg","hidden":false} */
export interface ScreenShot {
  /** ID */
  id?: number;
  /**
   * Image
   * An image file with size up to 20 MB.
   * @format uri
   */
  image?: string;
  /**
   * Hidden
   * Set image as hidden or visible.
   * @default false
   */
  hidden?: boolean;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
}

export interface GameStoreFull {
  /** ID */
  id?: number;
  /** Game id */
  game_id?: string;
  /** Store id */
  store_id?: string;
  /**
   * Url
   * @format uri
   * @minLength 1
   * @maxLength 500
   */
  url: string;
}

export interface GamePlatformMetacritic {
  /** Metascore */
  metascore?: number;
  /**
   * Url
   * @minLength 1
   */
  url?: string;
}

export interface GameSingle {
  /** ID */
  id?: number;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Name original
   * @minLength 1
   */
  name_original?: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /** Metacritic */
  metacritic?: number;
  metacritic_platforms?: GamePlatformMetacritic[];
  /**
   * Released
   * @format date
   */
  released?: string;
  /** TBA */
  tba?: boolean;
  /**
   * Updated
   * @format date-time
   */
  updated?: string;
  /**
   * Background image
   * @format uri
   */
  background_image?: string;
  /** Background image additional */
  background_image_additional?: string;
  /**
   * Website
   * @format uri
   * @minLength 1
   */
  website?: string;
  /** Rating */
  rating: number;
  /** Rating top */
  rating_top?: number;
  /** Ratings */
  ratings?: object;
  /** Reactions */
  reactions?: object;
  /** Added */
  added?: number;
  /** Added by status */
  added_by_status?: object;
  /**
   * Playtime
   * in hours
   */
  playtime?: number;
  /** Screenshots count */
  screenshots_count?: number;
  /** Movies count */
  movies_count?: number;
  /** Creators count */
  creators_count?: number;
  /** Achievements count */
  achievements_count?: number;
  /** Parent achievements count */
  parent_achievements_count?: string;
  /**
   * Reddit url
   * For example "https://www.reddit.com/r/uncharted/" or "uncharted"
   * @minLength 1
   */
  reddit_url?: string;
  /**
   * Reddit name
   * @minLength 1
   */
  reddit_name?: string;
  /**
   * Reddit description
   * @minLength 1
   */
  reddit_description?: string;
  /**
   * Reddit logo
   * @format uri
   * @minLength 1
   */
  reddit_logo?: string;
  /** Reddit count */
  reddit_count?: number;
  /** Twitch count */
  twitch_count?: string;
  /** Youtube count */
  youtube_count?: string;
  /** Reviews text count */
  reviews_text_count?: string;
  /** Ratings count */
  ratings_count?: number;
  /** Suggestions count */
  suggestions_count?: number;
  alternative_names?: string[];
  /**
   * Metacritic url
   * For example "http://www.metacritic.com/game/playstation-4/the-witcher-3-wild-hunt"
   * @minLength 1
   */
  metacritic_url?: string;
  /** Parents count */
  parents_count?: number;
  /** Additions count */
  additions_count?: number;
  /** Game series count */
  game_series_count?: number;
  esrb_rating?: {
    id?: number;
    slug?:
      | "everyone"
      | "everyone-10-plus"
      | "teen"
      | "mature"
      | "adults-only"
      | "rating-pending";
    name?:
      | "Everyone"
      | "Everyone 10+"
      | "Teen"
      | "Mature"
      | "Adults Only"
      | "Rating Pending";
  } | null;
  platforms?: {
    platform?: {
      id?: number;
      slug?: string;
      name?: string;
    };
    released_at?: string | null;
    requirements?: {
      minimum?: string;
      recommended?: string;
    } | null;
  }[];
}

export interface ParentAchievement {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /**
   * Image
   * @format uri
   */
  image?: string;
  /**
   * Percent
   * @format decimal
   */
  percent?: string;
}

export interface Movie {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Preview
   * @format uri
   */
  preview?: string;
  /** Data */
  data?: object;
}

export interface Reddit {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Text
   * @minLength 1
   */
  text?: string;
  /**
   * Image
   * @format uri
   * @minLength 1
   */
  image?: string;
  /**
   * Url
   * @format uri
   * @minLength 1
   */
  url?: string;
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Username url
   * @format uri
   * @minLength 1
   */
  username_url?: string;
  /**
   * Created
   * @format date-time
   */
  created?: string;
}

export interface Twitch {
  /** ID */
  id?: number;
  /** External id */
  external_id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /**
   * Created
   * @format date-time
   */
  created?: string;
  /**
   * Published
   * @format date-time
   */
  published?: string;
  /**
   * Thumbnail
   * @format uri
   * @minLength 1
   */
  thumbnail?: string;
  /** View count */
  view_count?: number;
  /**
   * Language
   * @minLength 1
   */
  language?: string;
}

export interface Youtube {
  /** ID */
  id?: number;
  /**
   * External id
   * @minLength 1
   */
  external_id?: string;
  /**
   * Channel id
   * @minLength 1
   */
  channel_id?: string;
  /**
   * Channel title
   * @minLength 1
   */
  channel_title?: string;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /**
   * Created
   * @format date-time
   */
  created?: string;
  /** View count */
  view_count?: number;
  /** Comments count */
  comments_count?: number;
  /** Like count */
  like_count?: number;
  /** Dislike count */
  dislike_count?: number;
  /** Favorite count */
  favorite_count?: number;
  /** Thumbnails */
  thumbnails?: object;
}

export interface Genre {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
}

export interface GenreSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Description */
  description?: string;
}

export interface Platform {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   */
  image_background?: string;
  /**
   * Image
   * @format uri
   */
  image?: string | null;
  /**
   * Year start
   * @min 0
   * @max 32767
   */
  year_start?: number | null;
  /**
   * Year end
   * @min 0
   * @max 32767
   */
  year_end?: number | null;
}

export interface PlatformParentSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  platforms: Platform[];
}

export interface PlatformSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   */
  image_background?: string;
  /** Description */
  description?: string;
  /**
   * Image
   * @format uri
   */
  image?: string | null;
  /**
   * Year start
   * @min 0
   * @max 32767
   */
  year_start?: number | null;
  /**
   * Year end
   * @min 0
   * @max 32767
   */
  year_end?: number | null;
}

export interface Publisher {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
}

export interface PublisherSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Description */
  description?: string;
}

export interface Store {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Domain
   * @maxLength 255
   */
  domain?: string | null;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
}

export interface StoreSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Domain
   * @maxLength 255
   */
  domain?: string | null;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Description */
  description?: string;
}

export interface Tag {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /**
   * Language
   * @minLength 1
   */
  language?: string;
}

export interface TagSingle {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /** Games count */
  games_count?: number;
  /**
   * Image background
   * @format uri
   * @minLength 1
   */
  image_background?: string;
  /** Description */
  description?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.rawg.io/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title RAWG Video Games Database API
 * @version v1.0
 * @baseUrl https://api.rawg.io/api
 *
 *
 * The largest open video games database.
 *
 * ### Why build on RAWG
 * - More than 350,000 games for 50 platforms including mobiles.
 * - Rich metadata: tags, genres, developers, publishers, individual creators, official websites, release dates,
 * Metacritic ratings.
 * - Where to buy: links to digital distribution services
 * - Similar games based on visual similarity.
 * - Player activity data: Steam average playtime and RAWG player counts and ratings.
 * - Actively developing and constantly getting better by user contribution and our algorithms.
 *
 * ### Terms of Use
 * - Free for personal use as long as you attribute RAWG as the source of the data and/or images and add an active
 * hyperlink from every page where the data of RAWG is used.
 * - Free for commercial use for startups and hobby projects with not more than 100,000 monthly active users or 500,000
 * page views per month. If your project is larger than that, email us at [api@rawg.io](mailto:api@rawg.io) for
 * commercial terms.
 * - No cloning. It would not be cool if you used our API to launch a clone of RAWG. We know it is not always easy
 * to say what is a duplicate and what isn't. Drop us a line at [api@rawg.io](mailto:api@rawg.io) if you are in doubt,
 * and we will talk it through.
 * - You must include an API key with every request. The key can be obtained at https://rawg.io/apidocs.
 * If you don’t provide it, we may ban your requests.
 *
 * __[Read more](https://rawg.io/apidocs)__.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  creatorRoles = {
    /**
     * No description
     *
     * @tags creator-roles
     * @name CreatorRolesList
     * @summary Get a list of creator positions (jobs).
     * @request GET:/creator-roles
     */
    creatorRolesList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Position[];
        },
        any
      >({
        path: `/creator-roles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  creators = {
    /**
     * No description
     *
     * @tags creators
     * @name CreatorsList
     * @summary Get a list of game creators.
     * @request GET:/creators
     */
    creatorsList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Person[];
        },
        any
      >({
        path: `/creators`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags creators
     * @name CreatorsRead
     * @summary Get details of the creator.
     * @request GET:/creators/{id}
     */
    creatorsRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<PersonSingle, any>({
        path: `/creators/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  developers = {
    /**
     * No description
     *
     * @tags developers
     * @name DevelopersList
     * @summary Get a list of game developers.
     * @request GET:/developers
     */
    developersList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Developer[];
        },
        any
      >({
        path: `/developers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags developers
     * @name DevelopersRead
     * @summary Get details of the developer.
     * @request GET:/developers/{id}
     */
    developersRead: (id: number, params: RequestParams = {}) =>
      this.request<DeveloperSingle, any>({
        path: `/developers/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  games = {
    /**
     * No description
     *
     * @tags games
     * @name GamesList
     * @summary Get a list of games.
     * @request GET:/games
     */
    gamesList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
        /** Search query. */
        search?: string;
        /** Disable fuzziness for the search query. */
        search_precise?: boolean;
        /** Mark the search query as exact. */
        search_exact?: boolean;
        /** Filter by parent platforms, for example: `1,2,3`. */
        parent_platforms?: string;
        /** Filter by platforms, for example: `4,5`. */
        platforms?: string;
        /** Filter by stores, for example: `5,6`. */
        stores?: string;
        /** Filter by developers, for example: `1612,18893` or `valve-software,feral-interactive`. */
        developers?: string;
        /** Filter by publishers, for example: `354,20987` or `electronic-arts,microsoft-studios`. */
        publishers?: string;
        /** Filter by genres, for example: `4,51` or `action,indie`. */
        genres?: string;
        /** Filter by tags, for example: `31,7` or `singleplayer,multiplayer`. */
        tags?: string;
        /** Filter by creators, for example: `78,28` or `cris-velasco,mike-morasky`. */
        creators?: string;
        /** Filter by a release date, for example: `2010-01-01,2018-12-31.1960-01-01,1969-12-31`. */
        dates?: string;
        /** Filter by an update date, for example: `2020-12-01,2020-12-31`. */
        updated?: string;
        /** Filter by platforms count, for example: `1`. */
        platforms_count?: number;
        /** Filter by a metacritic rating, for example: `80,100`. */
        metacritic?: string;
        /** Exclude games from a particular collection, for example: `123`. */
        exclude_collection?: number;
        /** Exclude additions. */
        exclude_additions?: boolean;
        /** Exclude games which have additions. */
        exclude_parents?: boolean;
        /** Exclude games which included in a game series. */
        exclude_game_series?: boolean;
        /** Exclude stores, for example: `5,6`. */
        exclude_stores?: string;
        /** Available fields: `name`, `released`, `added`, `created`, `updated`, `rating`, `metacritic`. You can reverse the sort order adding a hyphen, for example: `-released`. */
        ordering?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Game[];
        },
        any
      >({
        path: `/games`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesAdditionsList
     * @summary Get a list of DLC's for the game, GOTY and other editions, companion apps, etc.
     * @request GET:/games/{game_pk}/additions
     */
    gamesAdditionsList: (
      gamePk: string,
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Game[];
        },
        any
      >({
        path: `/games/${gamePk}/additions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesDevelopmentTeamList
     * @summary Get a list of individual creators that were part of the development team.
     * @request GET:/games/{game_pk}/development-team
     */
    gamesDevelopmentTeamList: (
      gamePk: string,
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: GamePersonList[];
        },
        any
      >({
        path: `/games/${gamePk}/development-team`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesGameSeriesList
     * @summary Get a list of games that are part of the same series.
     * @request GET:/games/{game_pk}/game-series
     */
    gamesGameSeriesList: (
      gamePk: string,
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Game[];
        },
        any
      >({
        path: `/games/${gamePk}/game-series`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesParentGamesList
     * @summary Get a list of parent games for DLC's and editions.
     * @request GET:/games/{game_pk}/parent-games
     */
    gamesParentGamesList: (
      gamePk: string,
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Game[];
        },
        any
      >({
        path: `/games/${gamePk}/parent-games`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesScreenshotsList
     * @summary Get screenshots for the game.
     * @request GET:/games/{game_pk}/screenshots
     */
    gamesScreenshotsList: (
      gamePk: string,
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: ScreenShot[];
        },
        any
      >({
        path: `/games/${gamePk}/screenshots`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesStoresList
     * @summary Get links to the stores that sell the game.
     * @request GET:/games/{game_pk}/stores
     */
    gamesStoresList: (
      gamePk: string,
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: GameStoreFull[];
        },
        any
      >({
        path: `/games/${gamePk}/stores`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesRead
     * @summary Get details of the game.
     * @request GET:/games/{id}
     */
    gamesRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<GameSingle, any>({
        path: `/games/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesAchievementsRead
     * @summary Get a list of game achievements.
     * @request GET:/games/{id}/achievements
     */
    gamesAchievementsRead: (
      id: number,
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<ParentAchievement, any>({
        path: `/games/${id}/achievements`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesMoviesRead
     * @summary Get a list of game trailers.
     * @request GET:/games/{id}/movies
     */
    gamesMoviesRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<Movie, any>({
        path: `/games/${id}/movies`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesRedditRead
     * @summary Get a list of most recent posts from the game's subreddit.
     * @request GET:/games/{id}/reddit
     */
    gamesRedditRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<Reddit, any>({
        path: `/games/${id}/reddit`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesSuggestedRead
     * @summary Get a list of visually similar games, available only for business and enterprise API users.
     * @request GET:/games/{id}/suggested
     */
    gamesSuggestedRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<GameSingle, any>({
        path: `/games/${id}/suggested`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesTwitchRead
     * @summary Get streams on Twitch associated with the game, available only for business and enterprise API users.
     * @request GET:/games/{id}/twitch
     */
    gamesTwitchRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<Twitch, any>({
        path: `/games/${id}/twitch`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags games
     * @name GamesYoutubeRead
     * @summary Get videos from YouTube associated with the game, available only for business and enterprise API users.
     * @request GET:/games/{id}/youtube
     */
    gamesYoutubeRead: (id: number, id: string, params: RequestParams = {}) =>
      this.request<Youtube, any>({
        path: `/games/${id}/youtube`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  genres = {
    /**
     * No description
     *
     * @tags genres
     * @name GenresList
     * @summary Get a list of video game genres.
     * @request GET:/genres
     */
    genresList: (
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Genre[];
        },
        any
      >({
        path: `/genres`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags genres
     * @name GenresRead
     * @summary Get details of the genre.
     * @request GET:/genres/{id}
     */
    genresRead: (id: number, params: RequestParams = {}) =>
      this.request<GenreSingle, any>({
        path: `/genres/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  platforms = {
    /**
     * No description
     *
     * @tags platforms
     * @name PlatformsList
     * @summary Get a list of video game platforms.
     * @request GET:/platforms
     */
    platformsList: (
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Platform[];
        },
        any
      >({
        path: `/platforms`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description For instance, for PS2 and PS4 the “parent platform” is PlayStation.
     *
     * @tags platforms
     * @name PlatformsListsParentsList
     * @summary Get a list of parent platforms.
     * @request GET:/platforms/lists/parents
     */
    platformsListsParentsList: (
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: PlatformParentSingle[];
        },
        any
      >({
        path: `/platforms/lists/parents`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags platforms
     * @name PlatformsRead
     * @summary Get details of the platform.
     * @request GET:/platforms/{id}
     */
    platformsRead: (id: number, params: RequestParams = {}) =>
      this.request<PlatformSingle, any>({
        path: `/platforms/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  publishers = {
    /**
     * No description
     *
     * @tags publishers
     * @name PublishersList
     * @summary Get a list of video game publishers.
     * @request GET:/publishers
     */
    publishersList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Publisher[];
        },
        any
      >({
        path: `/publishers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publishers
     * @name PublishersRead
     * @summary Get details of the publisher.
     * @request GET:/publishers/{id}
     */
    publishersRead: (id: number, params: RequestParams = {}) =>
      this.request<PublisherSingle, any>({
        path: `/publishers/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  stores = {
    /**
     * No description
     *
     * @tags stores
     * @name StoresList
     * @summary Get a list of video game storefronts.
     * @request GET:/stores
     */
    storesList: (
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Store[];
        },
        any
      >({
        path: `/stores`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name StoresRead
     * @summary Get details of the store.
     * @request GET:/stores/{id}
     */
    storesRead: (id: number, params: RequestParams = {}) =>
      this.request<StoreSingle, any>({
        path: `/stores/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * No description
     *
     * @tags tags
     * @name TagsList
     * @summary Get a list of tags.
     * @request GET:/tags
     */
    tagsList: (
      query?: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          count: number;
          /** @format uri */
          next?: string | null;
          /** @format uri */
          previous?: string | null;
          results: Tag[];
        },
        any
      >({
        path: `/tags`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tags
     * @name TagsRead
     * @summary Get details of the tag.
     * @request GET:/tags/{id}
     */
    tagsRead: (id: number, params: RequestParams = {}) =>
      this.request<TagSingle, any>({
        path: `/tags/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
