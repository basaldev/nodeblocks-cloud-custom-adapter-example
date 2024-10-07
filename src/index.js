const sdk = require("@basaldev/blocks-backend-sdk");
const { isAdult } = require("./utils");

/**
 * A hook function called after the adapter is created
 * This hook can be used to customize the adapter instance
 * 
 * @param Default adapter instance
 * @returns Updated adapter instance
 */
function adapterCreated(adapter) {
  const ageOfMajority = process.env.ADAPTER_CUSTOM_AGE_OF_MAJORITY
    ? parseInt(process.env.ADAPTER_CUSTOM_AGE_OF_MAJORITY)
    : 18;

  /**
   * Customize validators for createUser handler
   * https://docs.nodeblocks.dev/docs/how-tos/customization/customizing-adapters#customizing-handlers-and-validators-for-an-existing-endpoint
   */
  const updatedAdapter = sdk.adapter.setValidator(adapter, 'createUser', 'ageValidator', async (logger, context) => {
    logger.info('ageValidator');
    const birthday = context.body.customFields?.birthday;
    if (!birthday || !isAdult(birthday, ageOfMajority)) {
      logger.warn('ageValidator: birthday is undefined or not adult.');
      throw new sdk.NBError({
        code: 'ageValidator',
        httpCode: 400,
        message: `your age is under ${ageOfMajority}, according to your birthday: ${birthday}`,
      });
    }
    return 200;
  });

  return updatedAdapter;
}

exports.adapterCreated = adapterCreated;
