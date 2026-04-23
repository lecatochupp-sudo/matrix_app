Function ConvertLettersToNumber(ByVal strSource As String, ByVal Alphabet As String) As Integer

 

Dim i As Integer

Dim strResult As Integer



strSource = UCase(strSource)



For i = 1 To Len(strSource)

   

   strResult = strResult + ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)

    

Next



    ConvertLettersToNumber = strResult

    

End Function