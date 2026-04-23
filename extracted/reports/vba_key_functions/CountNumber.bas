Function CountNumber(ByVal strSource As String, ByVal Number As Integer) As Integer



Dim i As Integer

Dim strResult As Integer

Dim tempString As String



strResult = 0



For i = 1 To Len(strSource)



tempString = Mid(strSource, i, 1)



If tempString <> " " Then



If CInt(tempString) = Number Then



strResult = strResult + 1



End If



End If



Next



CountNumber = strResult



End Function