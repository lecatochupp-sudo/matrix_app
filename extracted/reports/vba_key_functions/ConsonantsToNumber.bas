Function ConsonantsToNumber(ByVal strSource As String, ByVal Alphabet As String, ByVal Volwels As String) As Integer

' https://unicode-table.com/en/#0417

Dim i As Integer

Dim strResult As Integer



strSource = UCase(strSource)



For i = 1 To Len(strSource)



If Not CheckVowels(Mid(strSource, i, 1), Volwels) Then



strResult = strResult + ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)



End If



Next



ConsonantsToNumber = strResult



End Function