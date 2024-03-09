export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        bucketName: 'd4log-bfc60.appspot.com',
        publicFiles: true,
        uniform: false,
        serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
        baseUrl: 'https://storage.googleapis.com/d4log-bfc60.appspot.com',
        basePath: 'media',
      },
    },
  },
});
