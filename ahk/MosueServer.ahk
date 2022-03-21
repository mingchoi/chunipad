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
		if(Event.data ="Key32down-air1")
		{
			MouseMove, 960, 15, 0
		}
		if(Event.data ="Key32up-air1")
		{
			MouseMove, 960, 200, 0
		}
		if(Event.data ="Key32down-air2")
		{
			MouseMove, 960, 45, 0
		}
		if(Event.data ="Key32up-air2")
		{
			MouseMove, 960, 200, 0
		}
		if(Event.data ="Key32down-air3")
		{
			MouseMove, 960, 75, 0
		}
		if(Event.data ="Key32up-air3")
		{
			MouseMove, 960, 200, 0
		}
		if(Event.data ="Key32down-air4")
		{
			MouseMove, 960, 105, 0
		}
		if(Event.data ="Key32up-air4")
		{
			MouseMove, 960, 200, 0
		}
		if(Event.data ="Key32down-air5")
		{
			MouseMove, 960, 135, 0
		}
		if(Event.data ="Key32up-air5")
		{
			MouseMove, 960, 200, 0
		}
		if(Event.data ="Key32down-air6")
		{
			MouseMove, 960, 165, 0
		}
		if(Event.data ="Key32up-air6")
		{
			MouseMove, 960, 200, 0
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
