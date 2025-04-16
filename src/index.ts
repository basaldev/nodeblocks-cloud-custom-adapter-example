import http from 'http';
import * as sdk from "@basaldev/blocks-backend-sdk";
import { ServiceOpts, defaultChat, MessagingAppConfig, createNodeblocksMessagingApp } from "@basaldev/blocks-messaging-service";

const context = {} as { adapter: defaultChat.ChatDefaultAdapter };

/**
 * Access to the configs set on the NBC dashboard based no the adapter manifest(nbc.adapter.json) by process.env
 * 
 * @example
 * const foo = process.env.ADAPTER_CUSTOM_FOO;
 */

/**
 * A hook function called before the adapter is created
 * This hook can be used to customize the adapter configs
 * 
 * @param {defaultChat.ChatDefaultAdapterOptions} adapterOptions Adapter options set on the NBC dashboard
 * @param {CreateChatDefaultAdapterDependencies} adapterDependencies Adapter dependencies set on the NBC dashboard
 * @returns {[defaultChat.ChatDefaultAdapterOptions, defaultChat.CreateChatDefaultAdapterDependencies]} Updated adapter options and dependencies
 */
export function beforeCreateAdapter(
  currentOptions: defaultChat.ChatDefaultAdapterOptions,
  currentDependencies: defaultChat.CreateChatDefaultAdapterDependencies): [defaultChat.ChatDefaultAdapterOptions, defaultChat.CreateChatDefaultAdapterDependencies] {
  /**
   * Add new custom fields here
   * https://docs.nodeblocks.dev/docs/how-tos/customization/customizing-adapters#adding-new-custom-fields
   * 
   * @example
   * const updatedOptions = {
   *   ...currentOptions,
   *   customFields: {
   *     user: [ ... ]
   *   }
   * };
   */
  const updatedOptions = {
    ...currentOptions
  };

  /**
   * Replace third-party services here
   * https://docs.nodeblocks.dev/docs/how-tos/customization/customizing-adapters#replacing-third-party-services
   * 
   * @example
   * const updatedDependencies = {
   *   ...currentDependencies,
   *   mailService: new CustomMailProvider(),
   * };
   */
  const updatedDependencies = {
    ...currentDependencies
  };

  return [updatedOptions, updatedDependencies];
}

/**
 * A hook function called after the adapter is created
 * This hook can be used to customize the adapter instance
 * 
 * @param {defaultChat.ChatDefaultAdapter} adapter Default adapter instance
 * @returns {defaultChat.ChatDefaultAdapter} Updated adapter instance
 */
export function adapterCreated(adapter: defaultChat.ChatDefaultAdapter): defaultChat.ChatDefaultAdapter {
  /**
   * Customize handlers and validators for an existing endpoint here
   * https://docs.nodeblocks.dev/docs/how-tos/customization/customizing-adapters#customizing-handlers-and-validators-for-an-existing-endpoint
   * 
   * @example
   * const updatedAdapter = sdk.adapter.setValidator(adapter, 'createUser', 'nameUnique', async (logger, context) => {
   *   ...
   *   return sdk.util.StatusCodes.OK;
   * });
   */
  const updatedAdapter = adapter;
  context.adapter = updatedAdapter;
  return updatedAdapter;
}

/**
 * A hook function called before the service is created
 * This hook can be used to customize the service configs
 * 
 * @param {MessagingAppConfig} currentConfigs Service configs set on the NBC dashboard
 */
export function beforeCreateService(currentConfigs: MessagingAppConfig): MessagingAppConfig {
  /**
   * Customize service options including CORS options here
   * 
   * @example
   * const updatedConfigs = {
   *   ...currentConfigs,
   *   corsOptions: {
   *     origin: '*',
   *   }
   * };
   */
  const updatedConfigs = {
    ...currentConfigs
  };

  return updatedConfigs;
}

/**
 * A hook function called after the service is created
 * This hook can be used to perform any post service creation tasks
 */
export function serviceCreated(service: ReturnType<typeof createNodeblocksMessagingApp>) {
  console.log('### Service created', service);
}

type StartServiceArgs = Parameters<ReturnType<typeof createNodeblocksMessagingApp>['startService']>;

/**
 * A hook function called before the service is started
 * This hook can be used to customize the options for starting the service
 * 
 * @param {ServiceOpts} currentOptions Service options
 * @returns {StartServiceArgs} Updated service start args
 */
export function beforeStartService(currentOptions: ServiceOpts): StartServiceArgs {
  /**
   * Add new api endpoints here
   * https://docs.nodeblocks.dev/docs/how-tos/customization/customizing-adapters#adding-new-api-endpoints
   * 
   * @example
   * const updatedOptions = {
   *   ...currentOptions,
   *   customRoutes: [
   *     {
   *       handler: async (logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext) => {
   *         ...
   *         return {
   *           data: ...,
   *           status: 200
   *         };
   *       },
   *       method: 'post' as const,
   *       path: '/coupons/use',
   *       validators: [
   *         async (logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext) => {
   *           ...
   *           return 200;
   *         }
   *       ]
   *     },
   *   ]
   * };
   */
  const updatedOptions = {
    ...currentOptions,
  };
  return [updatedOptions];
}

/**
 * A hook function called after the service is started
 * This hook can be used to perform any post service starting tasks
 */
export function serviceStarted(server: http.Server) {
  console.log('### Service started', server);
}
