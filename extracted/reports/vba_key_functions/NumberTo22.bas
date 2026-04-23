Function NumberTo22(ByVal intSource As Integer) As Integer



If intSource > 22 Then



    Do While intSource > 22

         intSource = intSource - 22

    Loop



End If



If intSource = 0 Then

        intSource = 22

End If



NumberTo22 = intSource



End Function