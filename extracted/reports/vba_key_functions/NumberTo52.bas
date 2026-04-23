Function NumberTo52(ByVal intSource As Integer) As Integer



If intSource > 52 Then



    Do While intSource > 52

         intSource = intSource - 52

    Loop



End If



If intSource = 0 Then

        intSource = 53

End If



NumberTo52 = intSource



End Function