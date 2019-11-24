#NoEnv
SetBatchLines, -1

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
