#!/bin/sh
### first flush all the iptables Rules
iptables -F

iptables -A INPUT -s 222.222.222.222/22 -j ACCEPT
iptables -A INPUT -s 255.255.255.255/22 -j DROP
iptables -A INPUT -s 1.2.3.4/22 -j ACCEPT
