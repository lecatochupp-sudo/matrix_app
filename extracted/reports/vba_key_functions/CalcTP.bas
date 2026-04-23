Function CalcTP(ByVal DOB As Integer) As Integer



Dim result As Integer

 

If DOB < 14 Then

    result = DOB

Else

    If DOB > 22 Then

        result = NumberTo22(DOB)

    End If

End If

    

CalcTP = result



End Function