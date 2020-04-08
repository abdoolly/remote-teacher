module.exports = {
    apps: [{
        name: 'backend',
        script: 'yarn',
        args: 'prod',
        interpreter: '/bin/bash',
        env: {
            NODE_ENV: 'development'
        }
    }]
};