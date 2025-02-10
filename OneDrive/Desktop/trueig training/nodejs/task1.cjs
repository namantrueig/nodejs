const fs = require('fs');
const path = require('path');
const os = require('os');

// 📁Define file path dynamically
const filePath = path.join(__dirname, 'data.txt');

//  Write data to a file
fs.writeFile(filePath, 'Hello, this is a Node.js file system demo!', (err) => {
    if (err) throw err;
    console.log(' File written successfully.');

    //  Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('📄 File content:', data);

        //  Append new data
        fs.appendFile(filePath, '\nNew data appended!', (err) => {
            if (err) throw err;
            console.log('✅ Data appended.');

            // Delete the file after 5 seconds
            setTimeout(() => {
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log('🗑️ File deleted.');
                });
            }, 5000);
        });
    });
});

//  Get system info
console.log('\n System Information:');
console.log(`OS Platform: ${os.platform()}`);
console.log(`OS Architecture: ${os.arch()}`);
console.log(`CPU Cores: ${os.cpus().length}`);
console.log(`Free Memory: ${os.freemem()} bytes`);
console.log(`Total Memory: ${os.totalmem()} bytes`);
console.log(`Home Directory: ${os.homedir()}`);
console.log(`System Uptime: ${os.uptime()} seconds`);
