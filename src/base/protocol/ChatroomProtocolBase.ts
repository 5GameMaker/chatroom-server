// Chatroom server
//
// Made by buj
// Copyrighted 2021. Do not steal!

// Version of protocol
export interface ProtocolVersion {
    version: string, // self-explanatory
    beta: boolean, // if true, user (probably) will be alerted about unstable build
    singlemode: boolean, // if true, only admin user should be available
}

export interface ProtocolVersionSupportInfo {
    supported: boolean, // ok
    warn?: boolean, // if true, user will be warned about compatibility issues
}

export abstract class ChatroomProtocolBase {
    constructor() {}

    public abstract version : ProtocolVersion;
    public abstract checkSupported(version : string) : ProtocolVersionSupportInfo
}

