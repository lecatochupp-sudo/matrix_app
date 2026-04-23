Function LettersToNumberArray(ByVal strSource As String, ByVal Alphabet As String) As String



Dim i As Integer

Dim strResult As String



For i = 1 To Len(strSource)



strResult = strResult + CStr(ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)) + " "





Next



LettersToNumberArray = strResult



End Function