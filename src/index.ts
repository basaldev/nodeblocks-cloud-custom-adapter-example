import * as sdk from "@basaldev/blocks-backend-sdk";
import { createNodeblocksUserApp } from "@basaldev/blocks-user-service";

type StartServiceArgs = Parameters<ReturnType<typeof createNodeblocksUserApp>['startService']>;
type ServiceOpts = StartServiceArgs[0];

/**
 * Define the RoleEntity class
 */
class RoleEntity extends sdk.mongo.BaseMongoEntity {
  constructor(
    public name: string,
    public permissions: string[],
  ) {
    super();
  }
}

/**
 * A hook function called before the service is started
 * This hook can be used to customize the options for starting the service
 * 
 * @param {ServiceOpts} currentOptions Service options
 * @returns {StartServiceArgs} Updated service start args
 */
export async function beforeStartService(currentOptions: ServiceOpts): Promise<StartServiceArgs> {
  const adapter = await currentOptions.adapter
  const db = (adapter as any).dependencies.db as sdk.mongo.Db;
  const roleRepository = new sdk.mongo.MongoRepository<RoleEntity>(db, 'roles');

  /**
   * Add new api endpoints here
   * https://docs.nodeblocks.dev/docs/how-tos/customization/customizing-adapters#adding-new-api-endpoints
   */
  const updatedOptions = {
    ...currentOptions,
    customRoutes: [
      {
        method: 'post' as const,
        path: '/roles',
        validators: [],
        handler: async (logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext) => {
          const name = context.body.name.toString();
          const permissions = context.body.permissions;
          const res = await roleRepository.create(new RoleEntity(name, permissions));
          return {
            data: res,
            status: 201
          };
        },
      },
      {
        method: 'get' as const,
        path: '/roles',
        validators: [],
        handler: async (logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext) => {
          const res = await roleRepository.findWithPagination({ filter: {}, sortParams: [] });
          return {
            data: res,
            status: 200
          };
        },
      },
      {
        method: 'patch' as const,
        path: '/roles/:roleId',
        validators: [],
        handler: async (logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext) => {
          const roleId = context.params?.roleId.toString() ?? '';
          const permissions = context.body.permissions;
          const res = await roleRepository.update(roleId, { permissions });
          return {
            data: res,
            status: 200
          };
        },
      },
      {
        method: 'delete' as const,
        path: '/roles/:roleId',
        validators: [],
        handler: async (logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext) => {
          const roleId = context.params?.roleId.toString() ?? '';
          const res = await roleRepository.delete(roleId);
          return {
            data: { success: res },
            status: 204
          };
        },
      },
    ]
  };
  return [updatedOptions];
}
