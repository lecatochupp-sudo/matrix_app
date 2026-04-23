Function CalculateRod(ByVal MLastName As String, ByVal FLastName As String, ByVal flag As Integer, ByVal Alphabet As String) As Integer



Dim tempRod As Integer



If flag = 0 Then



    tempRod = NumberTo22(ConvertLettersToNumber(MLastName, Alphabet))



Else



'Case 1

    If NumberTo22(ConvertLettersToNumber(MLastName, Alphabet)) = NumberTo22(ConvertLettersToNumber(FLastName, Alphabet)) Then



        tempRod = NumberTo22(ConvertLettersToNumber(FLastName, Alphabet)) + 1

 

    Else



        If NumberTo22(ConvertLettersToNumber(MLastName, Alphabet)) = NumberTo22(ConvertLettersToNumber(FLastName, Alphabet)) - 1 Then



            tempRod = NumberTo22(ConvertLettersToNumber(FLastName, Alphabet))

 

        Else



            tempRod = NumberTo22(ConvertLettersToNumber(FLastName, Alphabet))



        End If

    End If

End If



If tempRod > 22 Then

    tempRod = 1

End If



CalculateRod = tempRod



End Function