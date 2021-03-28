// Chatroom server
//
// Author - buj
// Copyrighted 2021. Do not steal!

import * as express from 'express';
import * as ews from 'express-ws';
import { ChatroomProtocolV1 } from './base/protocol';
import { WebServer } from './additional/webserver';

export * from './base/protocol';

export const protocol = new ChatroomProtocolV1();

async function main() {
    const app = express();
    ews(app);

    // get config values

    const instdir = process.env.INSTALLATION_DIRECTORY;
    
    if (!instdir) throw new Error('Installation directory is not specified');

    // v0 api describing main functions that won't change their behavour through the versions

    // HTTP GET /protocol/version
    // ChatroomProtocolBase.version - ProtocolVersion
    //
    // Get server protocol version
    app.get('/v0/protocol/version', async (req, res) => {
        res.json(protocol.version);
    });

    // HTTP GET /client/supported
    // ChatroomProtocolBase.checkSupport(version : string) - ProtocolVersionSupportInfo
    //
    // Check if version is supported
    app.get('/v0/client/supported', async (req, res) => {
        if (!req.query.version) {
            res.status(400).send('\'version\' param is required');
            return;
        }
        res.json(protocol.checkSupport(req.query.version));
    });

    // describing protocol

    // HTTP GET /hello
    // ChatroomProtocolV1.hello() - ChatroomServiceStatus
    //
    // Get service status. Returns list of plugins and endpoints for subservers, such as image
    // or authefication server. Client should use main endpoint if not specified 
    app.get('/v1/hello', (req, res) => res.json(protocol.hello()));

    // launch servers

    app.listen(process.env.SERVER_PORT || 1443);
    if (process.env.WEBSERVER_LAUNCH == 'default') new WebServer(new Number(process.env.WEB_PORT || 3000), process.env.WEB_ADDRESS || 'localhost');
}
if (require.main === module) main().catch(console.error);

