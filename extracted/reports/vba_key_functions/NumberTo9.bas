Function NumberTo9(ByVal intSource As Integer) As Integer



    Do While intSource > 9

         intSource = SumNumbers(intSource)

    Loop

    

    NumberTo9 = intSource



End Function