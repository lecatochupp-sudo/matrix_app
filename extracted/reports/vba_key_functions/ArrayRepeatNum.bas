Function ArrayRepeatNum(ByVal strNum As String, ByVal intNum As Integer) As String



Dim i As Integer

Dim strResult As String



If intNum = 0 Then



strResult = ChrW(1085) + ChrW(1077) + ChrW(1090)  ' "-" ChrW(1053) + ChrW(1045) + ChrW(1058)



Else





For i = 1 To intNum





strResult = strResult + strNum + " "



Next



End If



ArrayRepeatNum = strResult



End Function