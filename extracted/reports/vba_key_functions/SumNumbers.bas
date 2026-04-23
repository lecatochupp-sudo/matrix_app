Function SumNumbers(ByVal intSource As Long) As Long



Dim i As Integer

Dim intResult As Integer

Dim sign As Integer



sign = 1



If intSource < 0 Then

    sign = -1

    intSource = Abs(intSource)

End If



For i = 1 To Len(CStr(intSource))



intResult = intResult + CInt(Mid(CStr(intSource), i, 1))



Next

    

    SumNumbers = intResult * sign



End Function