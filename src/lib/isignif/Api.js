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

export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  baseUrl = "https://test.isignif.fr/api/v1/";
  securityData = null;
  securityWorker;
  abortControllers = new Map();
  customFetch = (...fetchParams) => fetch(...fetchParams);
  baseApiParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  constructor(apiConfig = {}) {
    Object.assign(this, apiConfig);
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  encodeQueryParam(key, value) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }
  addQueryParam(query, key) {
    return this.encodeQueryParam(key, query[key]);
  }
  addArrayQueryParam(query, key) {
    const value = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join("&");
  }
  toQueryString(rawQuery) {
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
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  contentFormatters = {
    [ContentType.Json]: (input) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input) =>
      Object.keys(input || {}).reduce((formData, key) => {
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
      }, new FormData()),
    [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
  };
  mergeRequestParams(params1, params2) {
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
  createAbortSignal = (cancelToken) => {
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
  abortRequest = (cancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };
  request = async ({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }) => {
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
      const r = response.clone();
      r.data = null;
      r.error = null;
      const data = !responseFormat
        ? r
        : await response[responseFormat]()
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
      if (!response.ok) throw data;
      return data;
    });
  };
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
export class Api extends HttpClient {
  acts = {
    /**
     * No description
     *
     * @tags Act
     * @name ActsList
     * @summary Liste les actes demandés
     * @request GET:/acts
     * @secure
     */
    actsList: (query, params = {}) =>
      this.request({
        path: `/acts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Act
     * @name ActsCreate
     * @summary Créer un acte
     * @request POST:/acts
     * @secure
     */
    actsCreate: (data, params = {}) =>
      this.request({
        path: `/acts`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Act
     * @name ActsDetail
     * @summary Récupère les informations à propos de l'acte
     * @request GET:/acts/{act_id}
     * @secure
     */
    actsDetail: (actId, params = {}) =>
      this.request({
        path: `/acts/${actId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Act
     * @name ActsUpdate
     * @summary Mise à jour de l'acte
     * @request PUT:/acts/{act_id}
     * @secure
     */
    actsUpdate: (actId, data, params = {}) =>
      this.request({
        path: `/acts/${actId}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Act
     * @name ActsDelete
     * @summary Supprime l'acte
     * @request DELETE:/acts/{act_id}
     * @secure
     */
    actsDelete: (actId, params = {}) =>
      this.request({
        path: `/acts/${actId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
    /**
     * No description
     *
     * @tags Act
     * @name AskCancelCreate
     * @summary Demande à tous les huissiers de justice affectés aux significations de l'acte d'annuler la demande.
     * @request POST:/acts/{act_id}/ask_cancel
     * @secure
     */
    askCancelCreate: (actId, params = {}) =>
      this.request({
        path: `/acts/${actId}/ask_cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Act
     * @name ConfirmCreate
     * @summary Confirme l'acte et prévient les huissiers de signifier les signification attachées à l'acte
     * @request POST:/acts/{act_id}/confirm
     * @secure
     */
    confirmCreate: (actId, params = {}) =>
      this.request({
        path: `/acts/${actId}/confirm`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesCreate
     * @summary Envoie un fichier à attacher à l'acte
     * @request POST:/acts/{act_id}/act_files
     * @secure
     */
    actFilesCreate: (actId, data, params = {}) =>
      this.request({
        path: `/acts/${actId}/act_files`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesList
     * @summary Liste tous les fichiers attachés à un acte
     * @request GET:/acts/{act_id}/act_files
     * @secure
     */
    actFilesList: (actId, params = {}) =>
      this.request({
        path: `/acts/${actId}/act_files`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesDetail
     * @summary Téléchargement d'un fichier
     * @request GET:/acts/{act_id}/act_files/{act_file_id}
     * @secure
     */
    actFilesDetail: (actId, actFileId, params = {}) =>
      this.request({
        path: `/acts/${actId}/act_files/${actFileId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesUpdate
     * @summary Met à jour un fichier
     * @request PUT:/acts/{act_id}/act_files/{act_file_id}
     * @secure
     */
    actFilesUpdate: (actId, actFileId, data, params = {}) =>
      this.request({
        path: `/acts/${actId}/act_files/${actFileId}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags ActFile
     * @name ActFilesDelete
     * @summary Supprime un fichier lié à un acte
     * @request DELETE:/acts/{act_id}/act_files/{act_file_id}
     * @secure
     */
    actFilesDelete: (actId, actFileId, params = {}) =>
      this.request({
        path: `/acts/${actId}/act_files/${actFileId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsList
     * @summary Récupère les informations d'une signification
     * @request GET:/acts/{act_id}/significations
     * @secure
     */
    significationsList: (actId, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsCreate
     * @summary Créé une signication attachée à un acte
     * @request POST:/acts/{act_id}/significations
     * @secure
     */
    significationsCreate: (actId, data, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsDetail
     * @summary Récupère les informations d'une signification
     * @request GET:/acts/{act_id}/significations/{signification_id}
     * @secure
     */
    significationsDetail: (actId, significationId, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations/${significationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsUpdate
     * @summary Met à jour une signification
     * @request PUT:/acts/{act_id}/significations/{signification_id}
     * @secure
     */
    significationsUpdate: (actId, significationId, data, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations/${significationId}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Signification
     * @name SignificationsDelete
     * @summary Supprime une signification
     * @request DELETE:/acts/{act_id}/significations/{signification_id}
     * @secure
     */
    significationsDelete: (actId, significationId, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations/${significationId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
    /**
     * No description
     *
     * @tags Message
     * @name SignificationsMessagesList
     * @summary Consulter les message de la messagerie de la signification
     * @request GET:/acts/{act_id}/significations/{signification_id}/messages
     * @secure
     */
    significationsMessagesList: (actId, significationId, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations/${significationId}/messages`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Message
     * @name SignificationsMessagesCreate
     * @summary Envoyer un message dans la conversation de la signification
     * @request POST:/acts/{act_id}/significations/{signification_id}/messages
     * @secure
     */
    significationsMessagesCreate: (actId, significationId, data, params = {}) =>
      this.request({
        path: `/acts/${actId}/significations/${significationId}/messages`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  actTypes = {
    /**
     * No description
     *
     * @tags ActTypes
     * @name ActTypesList
     * @summary Obtenir la liste des types d'actes
     * @request GET:/act_types
     */
    actTypesList: (params = {}) =>
      this.request({
        path: `/act_types`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  tokens = {
    /**
     * No description
     *
     * @tags Authentification
     * @name TokensCreate
     * @summary Obtenir un jeton d'authentification à l'API
     * @request POST:/tokens
     */
    tokensCreate: (data, params = {}) =>
      this.request({
        path: `/tokens`,
        method: "POST",
        body: data,
        format: "json",
        ...params,
      }),
  };
  advocates = {
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesList
     * @summary List all advocates
     * @request GET:/advocates
     * @secure
     */
    advocatesList: (params = {}) =>
      this.request({
        path: `/advocates`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesCreate
     * @summary Crée un nouveau compte de demandeur d'acte
     * @request POST:/advocates
     * @secure
     */
    advocatesCreate: (data, params = {}) =>
      this.request({
        path: `/advocates`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesDetail
     * @summary Récupère les informations de l'utilisateur
     * @request GET:/advocates/{advocate_id}
     * @secure
     */
    advocatesDetail: (advocateId, params = {}) =>
      this.request({
        path: `/advocates/${advocateId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesUpdate
     * @summary Met à jour le demandeur d'acte
     * @request PUT:/advocates/{advocate_id}
     * @secure
     */
    advocatesUpdate: (advocateId, data, params = {}) =>
      this.request({
        path: `/advocates/${advocateId}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Advocate
     * @name AdvocatesDelete
     * @summary Supprime le compte
     * @request DELETE:/advocates/{advocate_id}
     * @secure
     */
    advocatesDelete: (advocateId, params = {}) =>
      this.request({
        path: `/advocates/${advocateId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  bailiffs = {
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsList
     * @summary Liste les huissiers de justice
     * @request GET:/bailiffs
     * @secure
     */
    bailiffsList: (params = {}) =>
      this.request({
        path: `/bailiffs`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsCreate
     * @summary Créer un nouvel huissier de justice
     * @request POST:/bailiffs
     * @secure
     */
    bailiffsCreate: (data, params = {}) =>
      this.request({
        path: `/bailiffs`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsDetail
     * @summary Récupère les informations de l'huissier de justice
     * @request GET:/bailiffs/{bailiff_id}
     * @secure
     */
    bailiffsDetail: (bailiffId, params = {}) =>
      this.request({
        path: `/bailiffs/${bailiffId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsUpdate
     * @summary Met à jour l'utilisateur
     * @request PUT:/bailiffs/{bailiff_id}
     * @secure
     */
    bailiffsUpdate: (bailiffId, data, params = {}) =>
      this.request({
        path: `/bailiffs/${bailiffId}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Bailiff
     * @name BailiffsDelete
     * @summary Supprime l'utilisateur
     * @request DELETE:/bailiffs/{bailiff_id}
     * @secure
     */
    bailiffsDelete: (bailiffId, params = {}) =>
      this.request({
        path: `/bailiffs/${bailiffId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
