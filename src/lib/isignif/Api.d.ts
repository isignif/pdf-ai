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

export interface TokenRequest {
  /** @example "john@doe.fr" */
  email: string;
  /** @example "banana123" */
  password: string;
}
/** Représente un utilisateur */
export interface User {
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  activated?: string;
  created_at?: string;
  updated_at?: string;
  approved?: string;
  address_1?: string;
  address_2?: string;
  zip_code?: string;
  town?: string;
  company_name?: string;
  siret?: string;
  phone?: string;
}
/** Représente un utilisateur */
export interface UserRequest {
  email?: string;
  firstname?: string;
  lastname?: string;
  address_1?: string;
  address_2?: string;
  zip_code?: string;
  town?: string;
  company_name?: string;
  siret?: string;
  phone?: string;
}
/** Représente un ou plusieurs fichiers attaché à une signification ou un acte */
export interface ActFile {
  id?: number;
  name?: string;
  user_id?: number;
  act_id?: number;
  created_at?: string;
  updated_at?: string;
  signification_id?: number;
  kind?:
    | "default"
    | "to_deliver"
    | "instruction_letter"
    | "appendices"
    | "bill"
    | "proof_of_service";
}
/** Représente un ou plusieurs fichiers attaché à une signification ou un acte */
export interface ActFileRequest {
  name?: string;
  /** @format binary */
  files?: any;
}
/** Représente un type d'acte */
export interface ActType {
  id?: number;
  /**
   * Nom du type d'acte
   * @example "Assignation"
   */
  name?: string;
}
/** Représente une demande d'une ou plusieurs signification */
export interface Act {
  id?: number;
  /** L'identifiant de l'utilisateur qui fait la demande */
  advocate_id?: number;
  act_type_id?: number;
  /** @example "2024-01-02T10:11:59.000+01:00" */
  created_at?: string;
  /** @example "2024-01-02T10:11:59.000+01:00" */
  updated_at?: string;
  /**
   * The coefficient used for estimated value
   * @example 2
   */
  coefficient?: number;
  /**
   * Specify if act must be signified in 24h (`true`) or 5 days (`false`)
   * @example true
   */
  express?: boolean;
  /**
   * The customer reference for this acts
   * @example "1A2B3C"
   */
  reference?: string;
  /**
   * The customer reference who must appear on the bailiff bill
   * @example "1A2B3C"
   */
  bill_reference?: string;
  /** @example "2019-01-01" */
  downloaded_at?: string;
  /** @example "2019-01-01" */
  archived_at?: string;
  /**
   * Represent the estimated price of act.
   * @example 99.99
   */
  estimated_value_cache?: number;
  /** @example "John Doe" */
  bill_recipient?: string;
  /**
   * The customer SIRET who must appear on the bailiff bill
   * @example "437 933 302 00022"
   */
  bill_siret?: string;
  /**
   * The customer address who must appear on the bailiff bill
   * @example "1 rue des Lilas"
   */
  bill_address?: string;
  /**
   * The customer zip code who must appear on the bailiff bill
   * @example 69001
   */
  bill_zip_code?: string;
  /**
   * The customer town who must appear on the bailiff bill
   * @example "Lyon"
   */
  bill_town?: string;
  /**
   * The customer email who must appear on the bailiff bill
   * @example "customer@customer.fr"
   */
  bill_email?: string;
  /**
   * The customer phon who must appear on the bailiff bill
   * @example 33601010101
   */
  bill_phone?: string;
  /**
   * Le status de l'acte
   * @example "created"
   */
  status?:
    | "created"
    | "confirmed"
    | "read"
    | "signified"
    | "complete"
    | "ask_cancel"
    | "canceled"
    | "archived"
    | "to_be_confirmed";
}
export interface ActRequest {
  /** Type d'acte */
  act_type_id: number;
  /**
   * Demande que l'acte soit signifié en moins de 24h (`true`) ou 5 jours (`false`)
   * @example true
   */
  express?: boolean;
  /**
   * La référence du demandeur pour suivre le dossier
   * @example "1A2B3C"
   */
  reference?: string;
  /**
   * The customer reference who must appear on the bailiff bill
   * @example "1A2B3C"
   */
  bill_reference?: string;
  /** @example "John Doe" */
  bill_recipient?: string;
  /**
   * The customer SIRET who must appear on the bailiff bill
   * @example "437 933 302 00022"
   */
  bill_siret?: string;
  /**
   * The customer address who must appear on the bailiff bill
   * @example "1 rue des Lilas"
   */
  bill_address?: string;
  /**
   * The customer zip code who must appear on the bailiff bill
   * @example 69001
   */
  bill_zip_code?: string;
  /**
   * The customer town who must appear on the bailiff bill
   * @example "Lyon"
   */
  bill_town?: string;
  /**
   * The customer email who must appear on the bailiff bill
   * @example "customer@customer.fr"
   */
  bill_email?: string;
  /**
   * The customer phon who must appear on the bailiff bill
   * @example 33601010101
   */
  bill_phone?: string;
}
/** Représente une demande de signification attaché à un acte. */
export interface Signification {
  /** @example 1 */
  id?: number;
  /** @example 1 */
  act_id?: number;
  bailiff_id?: number;
  /** Commentaire à adresser à l'huissier de justice qui prendra en charge la demande */
  bailiff_comment?: string;
  /**
   * Nom de la signification
   * @example "Signification à Lyon"
   */
  name?: string;
  /**
   * Code postal de la signification
   * @example 69001
   */
  zip_code?: string;
  /** @example "2024-01-02T10:11:59.000+01:00" */
  created_at?: string;
  /** @example "2024-01-02T10:11:59.000+01:00" */
  updated_at?: string;
}
export interface SignificationRequest {
  /**
   * Nom de la signification
   * @example "Signification à Lyon"
   */
  name: string;
  /**
   * Code postal de la signification
   * @example 69001
   */
  zip_code: string;
  /** Commentaire à adresser à l'huissier de justice qui prendra en charge la demande */
  bailiff_comment?: string;
}
/** Represent a message linked to an act's signification */
export interface Message {
  id?: number;
  content?: string;
  signification_id?: number;
  user_id?: number;
  /** @example "2024-01-02T10:11:59.000+01:00" */
  created_at?: string;
  /** @example "2024-01-02T10:11:59.000+01:00" */
  updated_at?: string;
  read_at?: string;
}
export interface MessageRequest {
  content?: string;
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
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
export declare class HttpClient<SecurityDataType = unknown> {
  baseUrl: string;
  private securityData;
  private securityWorker?;
  private abortControllers;
  private customFetch;
  private baseApiParams;
  constructor(apiConfig?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  protected encodeQueryParam(key: string, value: any): string;
  protected addQueryParam(query: QueryParamsType, key: string): string;
  protected addArrayQueryParam(query: QueryParamsType, key: string): any;
  protected toQueryString(rawQuery?: QueryParamsType): string;
  protected addQueryParams(rawQuery?: QueryParamsType): string;
  private contentFormatters;
  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams;
  protected createAbortSignal: (
    cancelToken: CancelToken,
  ) => AbortSignal | undefined;
  abortRequest: (cancelToken: CancelToken) => void;
  request: <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title iSignif
 * @version 1.0
 * @termsOfService https://isignif.fr/tos
 * @baseUrl https://test.isignif.fr/api/v1/
 * @contact <arousseau@isignif.fr> (https://isignif.fr/contact)
 *
 * Signifiez vos actes simplement grâce à notre réseau d’huissiers de justice
 */
export declare class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  acts: {
    /**
     * No description
     *
     * @tags Act
     * @name ActsList
     * @summary Liste les actes demandés
     * @request GET:/acts
     * @secure
     */
    actsList: (
      query?: {
        /** Filtrer par référence pour le suivi du demandeur */
        reference?: string;
        /** Filtrer par référence indiquer sur la facture */
        bill_reference?: string;
        /** Filtrer par étape actuelle de l'acte */
        step?:
          | "created"
          | "confirmed"
          | "read"
          | "signified"
          | "complete"
          | "ask_cancel"
          | "archived";
        /** Filtrer par type d'acte */
        act_type_id?: number;
        /** Identifiant d'un huissier de justice affecté à une signification appartenant à l'acte */
        bailiff_id?: number;
        /** Identifiant de l'utilisateur qui a créé l'acte */
        advocate_id?: number;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          data?: Act[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Act
     * @name ActsCreate
     * @summary Créer un acte
     * @request POST:/acts
     * @secure
     */
    actsCreate: (
      data: Act,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente une demande d'une ou plusieurs signification */
          data?: Act;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags Act
     * @name ActsDetail
     * @summary Récupère les informations à propos de l'acte
     * @request GET:/acts/{act_id}
     * @secure
     */
    actsDetail: (
      actId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente une demande d'une ou plusieurs signification */
          data?: Act;
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Act
     * @name ActsUpdate
     * @summary Mise à jour de l'acte
     * @request PUT:/acts/{act_id}
     * @secure
     */
    actsUpdate: (
      actId: number,
      data: Act,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente une demande d'une ou plusieurs signification */
          data?: Act;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags Act
     * @name ActsDelete
     * @summary Supprime l'acte
     * @request DELETE:/acts/{act_id}
     * @secure
     */
    actsDelete: (
      actId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
    /**
     * No description
     *
     * @tags Act
     * @name AskCancelCreate
     * @summary Demande à tous les huissiers de justice affectés aux significations de l'acte d'annuler la demande.
     * @request POST:/acts/{act_id}/ask_cancel
     * @secure
     */
    askCancelCreate: (
      actId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<object, any>>;
    /**
     * No description
     *
     * @tags Act
     * @name ConfirmCreate
     * @summary Confirme l'acte et prévient les huissiers de signifier les signification attachées à l'acte
     * @request POST:/acts/{act_id}/confirm
     * @secure
     */
    confirmCreate: (
      actId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<object, any>>;
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesCreate
     * @summary Envoie un fichier à attacher à l'acte
     * @request POST:/acts/{act_id}/act_files
     * @secure
     */
    actFilesCreate: (
      actId: number,
      data: {
        /** @example "Sample ActFile" */
        name?: string;
        files?: File[];
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un ou plusieurs fichiers attaché à une signification ou un acte */
          data?: ActFile;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesList
     * @summary Liste tous les fichiers attachés à un acte
     * @request GET:/acts/{act_id}/act_files
     * @secure
     */
    actFilesList: (
      actId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          data?: ActFile[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesDetail
     * @summary Téléchargement d'un fichier
     * @request GET:/acts/{act_id}/act_files/{act_file_id}
     * @secure
     */
    actFilesDetail: (
      actId: number,
      actFileId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<File, any>>;
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesUpdate
     * @summary Met à jour un fichier
     * @request PUT:/acts/{act_id}/act_files/{act_file_id}
     * @secure
     */
    actFilesUpdate: (
      actId: number,
      actFileId: number,
      data: ActFile,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un ou plusieurs fichiers attaché à une signification ou un acte */
          data?: ActFile;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesDelete
     * @summary Supprime un fichier lié à un acte
     * @request DELETE:/acts/{act_id}/act_files/{act_file_id}
     * @secure
     */
    actFilesDelete: (
      actId: number,
      actFileId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsList
     * @summary Récupère les informations d'une signification
     * @request GET:/acts/{act_id}/significations
     * @secure
     */
    significationsList: (
      actId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          data?: Signification[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsCreate
     * @summary Créé une signication attachée à un acte
     * @request POST:/acts/{act_id}/significations
     * @secure
     */
    significationsCreate: (
      actId: number,
      data: Signification,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente une demande de signification attaché à un acte. */
          data?: Signification;
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsDetail
     * @summary Récupère les informations d'une signification
     * @request GET:/acts/{act_id}/significations/{signification_id}
     * @secure
     */
    significationsDetail: (
      actId: number,
      significationId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          data?: Signification[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsUpdate
     * @summary Met à jour une signification
     * @request PUT:/acts/{act_id}/significations/{signification_id}
     * @secure
     */
    significationsUpdate: (
      actId: number,
      significationId: number,
      data: Signification,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente une demande de signification attaché à un acte. */
          data?: Signification;
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsDelete
     * @summary Supprime une signification
     * @request DELETE:/acts/{act_id}/significations/{signification_id}
     * @secure
     */
    significationsDelete: (
      actId: number,
      significationId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
    /**
     * No description
     *
     * @tags Message
     * @name SignificationsMessagesList
     * @summary Consulter les message de la messagerie de la signification
     * @request GET:/acts/{act_id}/significations/{signification_id}/messages
     * @secure
     */
    significationsMessagesList: (
      actId: number,
      significationId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          data?: Message[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Message
     * @name SignificationsMessagesCreate
     * @summary Envoyer un message dans la conversation de la signification
     * @request POST:/acts/{act_id}/significations/{signification_id}/messages
     * @secure
     */
    significationsMessagesCreate: (
      actId: number,
      significationId: number,
      data: Message,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Represent a message linked to an act's signification */
          data?: Message;
        },
        object
      >
    >;
  };
  actTypes: {
    /**
     * No description
     *
     * @tags ActTypes
     * @name ActTypesList
     * @summary Obtenir la liste des types d'actes
     * @request GET:/act_types
     */
    actTypesList: (
      params?: RequestParams,
    ) => Promise<HttpResponse<ActType[], any>>;
  };
  tokens: {
    /**
     * No description
     *
     * @tags Authentification
     * @name TokensCreate
     * @summary Obtenir un jeton d'authentification à l'API
     * @request POST:/tokens
     */
    tokensCreate: (
      data: TokenRequest,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /**
           * The JWT token
           * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
           */
          token?: string;
        },
        void
      >
    >;
  };
  advocates: {
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesList
     * @summary List all advocates
     * @request GET:/advocates
     * @secure
     */
    advocatesList: (params?: RequestParams) => Promise<
      HttpResponse<
        {
          data?: User[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesCreate
     * @summary Crée un nouveau compte de demandeur d'acte
     * @request POST:/advocates
     * @secure
     */
    advocatesCreate: (
      data: Message,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un utilisateur */
          data?: User;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesDetail
     * @summary Récupère les informations de l'utilisateur
     * @request GET:/advocates/{advocate_id}
     * @secure
     */
    advocatesDetail: (
      advocateId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un utilisateur */
          data?: User;
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesUpdate
     * @summary Met à jour le demandeur d'acte
     * @request PUT:/advocates/{advocate_id}
     * @secure
     */
    advocatesUpdate: (
      advocateId: number,
      data: Message,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un utilisateur */
          data?: User;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesDelete
     * @summary Supprime le compte
     * @request DELETE:/advocates/{advocate_id}
     * @secure
     */
    advocatesDelete: (
      advocateId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
  };
  bailiffs: {
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsList
     * @summary Liste les huissiers de justice
     * @request GET:/bailiffs
     * @secure
     */
    bailiffsList: (params?: RequestParams) => Promise<
      HttpResponse<
        {
          data?: User[];
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsCreate
     * @summary Créer un nouvel huissier de justice
     * @request POST:/bailiffs
     * @secure
     */
    bailiffsCreate: (
      data: Message,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un utilisateur */
          data?: User;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsDetail
     * @summary Récupère les informations de l'huissier de justice
     * @request GET:/bailiffs/{bailiff_id}
     * @secure
     */
    bailiffsDetail: (
      bailiffId: number,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un utilisateur */
          data?: User;
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsUpdate
     * @summary Met à jour l'utilisateur
     * @request PUT:/bailiffs/{bailiff_id}
     * @secure
     */
    bailiffsUpdate: (
      bailiffId: number,
      data: Message,
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** Représente un utilisateur */
          data?: User;
        },
        object
      >
    >;
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsDelete
     * @summary Supprime l'utilisateur
     * @request DELETE:/bailiffs/{bailiff_id}
     * @secure
     */
    bailiffsDelete: (
      bailiffId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
  };
}
export {};
