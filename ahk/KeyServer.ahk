#NoEnv
SetBatchLines, -1
SetKeyDelay, -1

#Include WebSocket.ahk

new Example("ws://127.0.0.1:3000/")
return


class Example extends WebSocket
{
	OnOpen(Event)
	{
		this.Send("KeyServer.Register")
	}
	
	OnMessage(Event)
	{
		if(Event.data ="KeyDown-Air")
		{
			Send {space down}
		}
		if(Event.data ="KeyUp-Air")
		{
			Send {space up}
		}
		if(Event.data ="KeyDown-0")
		{
			Send {s down}
		}
		if(Event.data ="KeyDown-1")
		{
			Send {d down}
		}
		if(Event.data ="KeyDown-2")
		{
			Send {f down}
		}
		if(Event.data ="KeyDown-3")
		{
			Send {g down}
		}
		if(Event.data ="KeyDown-4")
		{
			Send {h down}
		}
		if(Event.data ="KeyDown-5")
		{
			Send {j down}
		}
		if(Event.data ="KeyDown-6")
		{
			Send {k down}
		}
		if(Event.data ="KeyDown-7")
		{
			Send {l down}
		}
		if(Event.data ="KeyUp-0")
		{
			Send {s up}
		}
		if(Event.data ="KeyUp-1")
		{
			Send {d up}
		}
		if(Event.data ="KeyUp-2")
		{
			Send {f up}
		}
		if(Event.data ="KeyUp-3")
		{
			Send {g up}
		}
		if(Event.data ="KeyUp-4")
		{
			Send {h up}
		}
		if(Event.data ="KeyUp-5")
		{
			Send {j up}
		}
		if(Event.data ="KeyUp-6")
		{
			Send {k up}
		}
		if(Event.data ="KeyUp-7")
		{
			Send {l up}
		}
		if(Event.data ="Key32down-1")
		{
			Send {i down}
		}
		if(Event.data ="Key32up-1")
		{
			Send {i up}
		}
		if(Event.data ="Key32down-2")
		{
			Send {, down}
		}
		if(Event.data ="Key32up-2")
		{
			Send {, up}
		}
		if(Event.data ="Key32down-3")
		{
			Send {8 down}
		}
		if(Event.data ="Key32up-3")
		{
			Send {8 up}
		}
		if(Event.data ="Key32down-4")
		{
			Send {k down}
		}
		if(Event.data ="Key32up-4")
		{
			Send {k up}
		}
		if(Event.data ="Key32down-5")
		{
			Send {u down}
		}
		if(Event.data ="Key32up-5")
		{
			Send {u up}
		}
		if(Event.data ="Key32down-6")
		{
			Send {m down}
		}
		if(Event.data ="Key32up-6")
		{
			Send {m up}
		}
		if(Event.data ="Key32down-7")
		{
			Send {7 down}
		}
		if(Event.data ="Key32up-7")
		{
			Send {7 up}
		}
		if(Event.data ="Key32down-8")
		{
			Send {j down}
		}
		if(Event.data ="Key32up-8")
		{
			Send {j up}
		}
		if(Event.data ="Key32down-9")
		{
			Send {y down}
		}
		if(Event.data ="Key32up-9")
		{
			Send {y up}
		}
		if(Event.data ="Key32down-10")
		{
			Send {n down}
		}
		if(Event.data ="Key32up-10")
		{
			Send {n up}
		}
		if(Event.data ="Key32down-11")
		{
			Send {6 down}
		}
		if(Event.data ="Key32up-11")
		{
			Send {6 up}
		}
		if(Event.data ="Key32down-12")
		{
			Send {h down}
		}
		if(Event.data ="Key32up-12")
		{
			Send {h up}
		}
		if(Event.data ="Key32down-13")
		{
			Send {t down}
		}
		if(Event.data ="Key32up-13")
		{
			Send {t up}
		}
		if(Event.data ="Key32down-14")
		{
			Send {b down}
		}
		if(Event.data ="Key32up-14")
		{
			Send {b up}
		}
		if(Event.data ="Key32down-15")
		{
			Send {5 down}
		}
		if(Event.data ="Key32up-15")
		{
			Send {5 up}
		}
		if(Event.data ="Key32down-16")
		{
			Send {g down}
		}
		if(Event.data ="Key32up-16")
		{
			Send {g up}
		}
		if(Event.data ="Key32down-17")
		{
			Send {r down}
		}
		if(Event.data ="Key32up-17")
		{
			Send {r up}
		}
		if(Event.data ="Key32down-18")
		{
			Send {v down}
		}
		if(Event.data ="Key32up-18")
		{
			Send {v up}
		}
		if(Event.data ="Key32down-19")
		{
			Send {4 down}
		}
		if(Event.data ="Key32up-19")
		{
			Send {4 up}
		}
		if(Event.data ="Key32down-20")
		{
			Send {f down}
		}
		if(Event.data ="Key32up-20")
		{
			Send {f up}
		}
		if(Event.data ="Key32down-21")
		{
			Send {e down}
		}
		if(Event.data ="Key32up-21")
		{
			Send {e up}
		}
		if(Event.data ="Key32down-22")
		{
			Send {c down}
		}
		if(Event.data ="Key32up-22")
		{
			Send {c up}
		}
		if(Event.data ="Key32down-23")
		{
			Send {3 down}
		}
		if(Event.data ="Key32up-23")
		{
			Send {3 up}
		}
		if(Event.data ="Key32down-24")
		{
			Send {d down}
		}
		if(Event.data ="Key32up-24")
		{
			Send {d up}
		}
		if(Event.data ="Key32down-25")
		{
			Send {w down}
		}
		if(Event.data ="Key32up-25")
		{
			Send {w up}
		}
		if(Event.data ="Key32down-26")
		{
			Send {x down}
		}
		if(Event.data ="Key32up-26")
		{
			Send {x up}
		}
		if(Event.data ="Key32down-27")
		{
			Send {2 down}
		}
		if(Event.data ="Key32up-27")
		{
			Send {2 up}
		}
		if(Event.data ="Key32down-28")
		{
			Send {s down}
		}
		if(Event.data ="Key32up-28")
		{
			Send {s up}
		}
		if(Event.data ="Key32down-29")
		{
			Send {q down}
		}
		if(Event.data ="Key32up-29")
		{
			Send {q up}
		}
		if(Event.data ="Key32down-30")
		{
			Send {z down}
		}
		if(Event.data ="Key32up-30")
		{
			Send {z up}
		}
		if(Event.data ="Key32down-31")
		{
			Send {1 down}
		}
		if(Event.data ="Key32up-31")
		{
			Send {1 up}
		}
		if(Event.data ="Key32down-32")
		{
			Send {a down}
		}
		if(Event.data ="Key32up-32")
		{
			Send {a up}
		}
		if(Event.data ="Key32down-air1")
		{
			Send {/ down}
		}
		if(Event.data ="Key32up-air1")
		{
			Send {/ up}
		}
		if(Event.data ="Key32down-air2")
		{
			Send {. down}
		}
		if(Event.data ="Key32up-air2")
		{
			Send {. up}
		}
		if(Event.data ="Key32down-air3")
		{
			Send {' down}
		}
		if(Event.data ="Key32up-air3")
		{
			Send {' up}
		}
		if(Event.data ="Key32down-air4")
		{
			Send {; down}
		}
		if(Event.data ="Key32up-air4")
		{
			Send {; up}
		}
		if(Event.data ="Key32down-air5")
		{
			Send {] down}
		}
		if(Event.data ="Key32up-air5")
		{
			Send {] up}
		}
		if(Event.data ="Key32down-air6")
		{
			Send {[ down}
		}
		if(Event.data ="Key32up-air6")
		{
			Send {[ up}
		}
	}
	
	OnClose(Event)
	{
		MsgBox, Websocket Closed
		this.Disconnect()
	}
	
	OnError(Event)
	{
		MsgBox, Websocket Error
	}
	
	__Delete()
	{
		MsgBox, Exiting
		ExitApp
	}
}
