#!/usr/bin/env node
process.on('unhandledRejection', (err) => {
    console.log(err)
    fail(err)
});
