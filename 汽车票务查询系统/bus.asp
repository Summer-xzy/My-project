<%@ LANGUAGE = "VBScript" CodePage = 65001%>
<%Response.Buffer=true
Session.CodePage=65001
Response.Charset="utf-8"
dim conn,connstr
connstr="Provider = Microsoft.Jet.OLEDB.4.0;Data Source = " & Server.MapPath("db/bus.mdb")

Sub openconn()
	On Error Resume Next
	Set conn = Server.CreateObject("ADODB.Connection")
	conn.open connstr
	If Err Then
		Err.clear
		Set conn = Nothing
		response.Write "error"
		response.End
	End If
End Sub
Sub closeconn()
	conn.close
	Set conn=Nothing
End Sub

Function chkint(n,d)
Dim v
On Error Resume Next
v=CLng(n)
If Err Or v=0 Then
Err.clear
v=d
End If
chkint=v
End Function

Public Function chksql(s)
s=Replace(s&"","'","''")
chksql=s
End Function

Public Function fmtd(d,t)
Dim m
If Not IsDate(d) Or t="" Then fmtd="":Exit Function
t=Replace(t,"[Y]",Year(d))
t=Replace(t,"[y]",Right(Year(d),2))
t=Replace(t,"[M]",Month(d))
t=Replace(t,"[m]",Right("00" & Month(d),2))
t=Replace(t,"[D]",Day(d))
t=Replace(t,"[d]",Right("00" & Day(d),2))
t=Replace(t,"[H]",Hour(d))
t=Replace(t,"[h]",Right("00" & Hour(d),2))
t=Replace(t,"[MI]",Minute(d))
t=Replace(t,"[mi]",Right("00" & Minute(d),2))
t=Replace(t,"[S]",Second(d))
t=Replace(t,"[s]",Right("00" & Second(d),2))
fmtd=t
End Function
Function FormatPrice(p)
formatPrice = FormatNumber(p,2,-1,-1,0)
End Function

Function echo(s)
response.write s
End Function

Function die(s)
response.write s:response.end
End Function

'action start

openconn
act=request("act")

Select Case act

Case "addbus":Call addbus
Case "deletebus":Call deletebus
Case "deleteticket":Call deleteticket
Case "querybus":Call querybus
Case "buyticket":Call buyticket
Case "refundticket":Call refundticket
Case "getbus":Call getbus
Case "listbus":Call listbus
Case "listticket":Call listticket
Case "queryticket":Call queryticket
End Select


Sub addbus()
Set rs=server.CreateObject("adodb.recordset")
rs.open "select * from tbl_bus",conn,1,3
rs.addnew
rs("bus")=request("bus")
rs("from")=request("from")
rs("to")=request("to")
rs("bus_date")=request("date")
rs("bus_time")=request("time")
rs("seats")=request("seats")
rs("price")=request("price")
rs("ticket")=request("ticket")
rs.Update
rs.close
set rs=Nothing
closeconn
die(1)
End Sub

Sub deletebus()
id=chkint(request("id"),0)
conn.execute("delete from tbl_bus where id="&id)
closeconn
die(1)
End Sub

Sub deleteticket()
id=chkint(request("id"),0)
conn.execute("delete from tbl_ticket where id="&id)
closeconn
die(1)
End Sub

Sub querybus()
busFrom = chksql(request("from"))
busTo = chksql(request("to"))
busDate = request("date")
If Not IsDate(busDate) Then busDate=Date()

s=""
Set rs=conn.execute("select * from tbl_bus where from='"&busFrom&"' and to='"&busTo&"' and bus_date=#"&busDate&"# order by bus_time asc" )
While Not rs.eof
If rs("ticket")>0 Then btn="<input type=""button"" class=""btn_buy"" value=""购票"" rel="&rs("id")&">" Else btn="无票"
s=s&"<tr><td>"&rs("bus")&"</td><td>"&rs("from")&"</td><td>"&rs("to")&"</td><td>"&fmtd(rs("bus_date"),"[Y]-[m]-[d]")&"</td><td>"&rs("bus_time")&"</td><td>"&rs("seats")&"</td><td class=""green"">"&FormatPrice(rs("price"))&"</td><td class=""blue"">"&rs("ticket")&"</td><td>"&btn&"</td></tr>"
rs.movenext
Wend
rs.close:Set rs=Nothing
If s="" Then s="<tr><td colspan=""9"">没有查询到结果</td></tr>"
closeconn
die(s)

End Sub


Sub queryticket()
username = chksql(request("username"))
idcard = chksql(request("idcard"))

s=""
Set rs=conn.execute("select * from tbl_ticket where username='"&username&"' and idcard='"&idcard&"' order by id desc" )
While Not rs.eof

Set qs=conn.execute("select * from tbl_bus where id="&rs("busid"))
If Not qs.eof Then
bus=qs("bus")
busfrom=qs("from")
busto=qs("to")
busdate=qs("bus_date")
bustime=qs("bus_time")
price=qs("price")
End If
qs.close:Set qs=nothing
s=s&"<tr><td>"&bus&"</td><td>"&busfrom&"</td><td>"&busto&"</td><td>"&fmtd(busdate,"[Y]-[m]-[d]")&"</td><td>"&bustime&"</td><td>"&FormatPrice(price)&"</td><td>"&rs("username")&"</td><td>"&rs("idcard")&"</td><td><input type=""button"" value=""退票"" class=""btn_refund_ticket"" rel="&rs("id")&"></td></tr>"
rs.movenext
Wend
rs.close:Set rs=Nothing
If s="" Then s="<tr><td colspan=""9"">没有查询到结果</td></tr>"
closeconn
die(s)

End Sub



Sub listbus()
s=""
Set rs=conn.execute("select * from tbl_bus order by id desc" )
While Not rs.eof
s=s&"<tr><td>"&rs("id")&"</td><td>"&rs("bus")&"</td><td>"&rs("from")&"</td><td>"&rs("to")&"</td><td>"&fmtd(rs("bus_date"),"[Y]-[m]-[d]")&"</td><td>"&rs("bus_time")&"</td><td>"&rs("seats")&"</td><td>"&FormatPrice(rs("price"))&"</td><td>"&rs("ticket")&"</td><td><input type=""button"" value=""删除"" class=""btn_delete_bus"" rel="&rs("id")&"></td></tr>"
rs.movenext
Wend
rs.close:Set rs=Nothing
If s="" Then s="<tr><td colspan=""10"">没有查询到结果</td></tr>"
closeconn
die(s)

End Sub

Sub listticket()
s=""
Set rs=conn.execute("select * from tbl_ticket order by id desc" )
While Not rs.eof

Set qs=conn.execute("select * from tbl_bus where id="&rs("busid"))
If Not qs.eof Then
bus=qs("bus")
busfrom=qs("from")
busto=qs("to")
busdate=qs("bus_date")
bustime=qs("bus_time")
price=qs("price")
End If
qs.close:Set qs=nothing
s=s&"<tr><td>"&bus&"</td><td>"&busfrom&"</td><td>"&busto&"</td><td>"&fmtd(busdate,"[Y]-[m]-[d]")&"</td><td>"&bustime&"</td><td>"&FormatPrice(price)&"</td><td>"&rs("username")&"</td><td>"&rs("idcard")&"</td><td><input type=""button"" value=""删除"" class=""btn_delete_ticket"" rel="&rs("id")&"></td></tr>"
rs.movenext
Wend
rs.close:Set rs=Nothing
If s="" Then s="<tr><td colspan=""9"">没有查询到结果</td></tr>"
closeconn
die(s)

End Sub


Sub buyticket()
busid=chkint(request("id"),0)

Set rs=server.CreateObject("adodb.recordset")
rs.open "select * from tbl_ticket",conn,1,3
rs.addnew
rs("busid")=busid
rs("username")=request("username")
rs("idcard")=request("idcard")
rs("buytime")=Now
rs.Update
rs.close
set rs=Nothing

conn.execute("update tbl_bus set ticket=ticket-1 where id="&busid)
closeconn
die(1)
End Sub

Sub refundticket()
id=chkint(request("id"),0)
busid=0
Set rs=conn.execute("select busid from tbl_ticket where id="&id)
If Not rs.eof Then busid=rs(0)
rs.close:Set rs=Nothing
If busid>0 Then conn.execute("update tbl_bus set ticket=ticket+1 where id="&busid)
conn.execute("delete from tbl_ticket where id="&id)
closeconn
die(1)
End Sub

Sub getbus()
id=chkint(request("id"),0)
s=""
Set rs=conn.execute("select * from tbl_bus where id="&id)
If Not rs.eof Then
s="<tr><td>"&rs("bus")&"</td><td>"&rs("from")&"</td><td>"&rs("to")&"</td><td>"&fmtd(rs("bus_date"),"[Y]-[m]-[d]")&"</td><td>"&rs("bus_time")&"</td><td>"&formatPrice(rs("price"))&"</td></tr>"
End If
rs.close:Set rs=Nothing

closeconn
die(s)
End Sub
%>