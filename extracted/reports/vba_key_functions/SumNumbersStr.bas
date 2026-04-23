Function SumNumbersStr(ByVal intSource As String) As Long



Dim i As Integer

Dim intResult As Integer



For i = 1 To Len(CStr(intSource))



If IsNumeric(Mid(CStr(intSource), i, 1)) Then



intResult = intResult + CInt(Mid(CStr(intSource), i, 1))



End If



Next



  

    SumNumbersStr = intResult



End Function