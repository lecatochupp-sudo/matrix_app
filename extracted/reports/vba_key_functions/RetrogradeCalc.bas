Function RetrogradeCalc(ByVal intNum As Integer, ByVal yesNo As Integer, ByVal Number As Integer) As Integer



Dim strResult As Integer

Dim i As Integer



If yesNo = 0 Then

    strResult = intNum

Else

    For i = 0 To Number - 1

        

        If intNum < 40 Then

           strResult = intNum + 13

        Else

            strResult = intNum + 1

        End If

        intNum = strResult

    Next

End If



If strResult > 53 Then

    strResult = 53

End If

    

RetrogradeCalc = strResult



End Function