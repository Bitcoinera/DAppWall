#!/bin/sh
### first flush all the iptables Rules
iptables -F

iptables -A INPUT -s 55555 -j DROP
iptables -A INPUT -s 333 -j DROP
iptables -A INPUT -s 4444 -j DROP
iptables -A INPUT -s 666666 -j DROP
iptables -A INPUT -s 7777777 -j DROP
iptables -A INPUT -s 88888888 -j DROP
