Function SolarDate(ByVal DOB As Date, ByVal OtherDate As Date) As Date





Dim currentDate As Date

Dim solarYear As Integer

Dim tmpDate As Date



tmpDate = DateSerial(year(OtherDate), month(DOB), Day(DOB))



If tmpDate > OtherDate Then



tmpDate = DateSerial(year(OtherDate) - 1, month(DOB), Day(DOB))



End If





SolarDate = tmpDate



End Function