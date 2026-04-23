Function LastNotZero(ByVal intSource As Integer) As Integer



Dim i As Integer

Dim intResult As Integer



For i = Len(CStr(intSource)) To 1 Step -1

            

        If CInt(Mid(CStr(intSource), i, 1)) <> 0 Then



            intResult = CInt(Mid(CStr(intSource), i, 1))

            Exit For

        End If

Next



LastNotZero = intResult



End Function