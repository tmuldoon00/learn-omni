# Connecting databases using SSH

**Source URL:** [https://docs.omni.co/docs/connections/manage/ssh-tunnels](https://docs.omni.co/docs/connections/manage/ssh-tunnels)  
**Extracted:** 2025-07-23 21:44:07  
**Source:** Omni Analytics Documentation

---

On this page

If your database is in a private network or an additional layer of network encryption is needed, Omni can connect through an SSH tunnel. In this configuration, Omni establishes an encrypted connection to an SSH server on your network, and then uses SSH's Local Forwarding feature to route traffic through the SSH connection to the database in your network.

These are the steps to setup an SSH connection with Omni:

Setup the SSH server in your network

Contact Omni support with the following information:

The host, port and user to connect to your SSH server

The host, port, and type of the database for Omni to connect to on the other side of the SSH tunnel (this should be a private IP address or DNS entry that resolves to one)

Omni support will generate an authentication keypair and send you the public key to authorize on your SSH server

Once this is complete, Omni support will confirm the SSH connection can be established and add the new database connection to your Omni instance.

warning

Once Omni support establishes the SSH tunnel to your server, making any changes to the

host

port

in Omni could result in Omni being unable to connect.

If you rebuild or change your SSH server and the SSH host keys change, this could result in Omni being unable to connect.

Please contact Omni support if you plan to make any changes to your connection once an SSH tunnel has been established.

SSH Server Setup

We recommend using the OpenSSH server, as it is the most widely used SSH server and is guaranteed to be compatible with the OpenSSH client we use to establish the connection. Most Linux distributions come with OpenSSH installed or easily installable through a package manager.

Your SSH server must be in a network that accepts traffic on the SSH port from Omni's

outbound IP addresses

, and be able to route traffic to the network that the database resides in. Additionally, the database's firewall must be configured to accept traffic from the SSH server.

SSH Server Setup

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/manage/ssh-tunnels](https://docs.omni.co/docs/connections/manage/ssh-tunnels) on 2025-07-23.*
