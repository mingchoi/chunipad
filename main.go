package main

import (
	"log"
	"net"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

const (
	// ChuniMessageSources
	Game       = 0
	Controller = 1
	// ChuniMessageTypes
	CoinInsert     = 0
	SliderPress    = 1
	SliderRelease  = 2
	LedSet         = 3
	CabinetTest    = 4
	CabinetService = 5
	IrBlocked      = 6
	IrUnblocked    = 7
	// Key Target
	IR0 = 0
	IR1 = 1
	IR2 = 2
	IR3 = 3
	IR4 = 4
	IR5 = 5
	// RGB
	Empty = 0
)

func generateEvent(event, target byte) []byte {
	return []byte{Controller, event, target, Empty, Empty, Empty}
}

func number2byte(number string) byte {
	switch number {
	case "0":
		return IR0
	case "1":
		return IR1
	case "2":
		return IR2
	case "3":
		return IR3
	case "4":
		return IR4
	case "5":
		return IR5
	}
	return 0
}

/* WS Server */

var upgrader = websocket.Upgrader{}

var conn net.Conn

func echo(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			panic(err)
		}
		splited := strings.Split(string(message), "-")
		if splited[0] == "air" {
			if splited[1] == "down" {
				conn.Write(generateEvent(IrBlocked, number2byte(splited[2])))
			} else if splited[1] == "up" {
				conn.Write(generateEvent(IrUnblocked, number2byte(splited[2])))
			}
		}
	}
}

func main() {
	conn, _ = net.Dial("udp", "127.0.0.1:24864")
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	http.HandleFunc("/ws", echo)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
