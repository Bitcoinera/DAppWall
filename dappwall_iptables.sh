#!/bin/sh
### first flush all the iptables Rules
iptables -F

iptables -A INPUT -s 222.222.222.222/22 ; SBL000000 -j DROP
iptables -A INPUT -s 255.255.255.255/22 ; SBL000001 -j DROP
iptables -A INPUT -s 111.1.22.3/11 ; SBL000002 -j DROP
