module.exports = {
    apps: [
        {
            name: 'api-rest',
            script: 'dist/main_api.js',
        },
        {
            name: 'api-deeplink',
            script: 'dist/main_deeplink.js',
        },
    ],
};
