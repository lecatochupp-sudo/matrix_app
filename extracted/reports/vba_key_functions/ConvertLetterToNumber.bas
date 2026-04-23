Function ConvertLetterToNumber(ByVal letter As String, ByVal Alphabet As String) As Integer



    Dim temp As Integer

    

    letter = UCase(letter)

    Alphabet = UCase(Alphabet)

    

    temp = InStr(1, Alphabet, letter, vbTextCompare)



    If temp >= 9 Then

        Dim tempMod As Integer

        

        tempMod = temp Mod 9

        

        If tempMod = 0 Then

            temp = 9

        Else

            temp = tempMod

        End If

    Else

        temp = temp

    End If



    ConvertLetterToNumber = temp

    

End Function