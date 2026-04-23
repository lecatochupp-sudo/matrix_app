Function KarmicShadow(ByVal DOB As Date, ByVal OtherDate As Date, ByVal OPV As Integer) As Integer



Dim tmpNumber As Integer

Dim tmpDate As Date



tmpNumber = 1

tmpDate = DOB

OtherDate = DateAdd("yyyy", -OPV, OtherDate)



Do While tmpDate < OtherDate



tmpDate = DateAdd("yyyy", OPV, tmpDate)

tmpNumber = tmpNumber * -1



Loop



KarmicShadow = tmpNumber



End Function