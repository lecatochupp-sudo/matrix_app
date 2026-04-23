Attribute VB_Name = "Module1"
'ParamArray numbers() As Variant)
'Function CountChildren(ByVal strSource As String) As String
Function CountChildren(ParamArray numbers() As Variant) As String

Dim i As Integer
Dim strResult As Integer
Dim tempResult As Integer
Dim tempString As String

Const Arcana2 = 1
Const Arcana3 = 2
Const Arcana6 = 1
Const Arcana18 = 1
Const Arcana20 = 4
Const Arcana22 = 3


strResult = 0
tempResult = 0


'LBound of a ParamArray is always 0. Each element of the ParamArray is added here:
For i = LBound(numbers) To UBound(numbers)

tempString = numbers(i) 'Mid(strSource, i, 1)

tempResult = 0

        Select Case CInt(tempString)
            Case 2
               tempResult = Arcana2
            Case 3
               tempResult = Arcana3
            Case 6
               tempResult = Arcana6
            Case 18
               tempResult = Arcana18
            Case 20
               tempResult = Arcana20
            Case 22
               tempResult = Arcana22
        End Select
        
        strResult = strResult + tempResult
            
Next i


CountChildren = strResult

End Function

Public Function Reverse(ByVal text As String) As String
    
    Dim ReverseStr As String
    For i = Len(CStr(text)) To 1 Step -1
        ReverseStr = ReverseStr + Mid(CStr(text), i, 1)
    Next

    Reverse = ReverseStr
End Function


Function CountOdd(ByVal strSounce As String) As Integer
Dim i As Integer
Dim intResult As Integer

For i = 1 To Len(CStr(strSounce))

    If CLng(Mid(CStr(strSounce), i, 1)) Mod CLng(2) <> 0 Then

        intResult = intResult + 1
        
    End If

Next
    
    CountOdd = intResult


End Function

Function CountEven(ByVal strSounce As String) As Integer
Dim i As Integer
Dim intResult As Integer

For i = 1 To Len(CStr(strSounce))

If CInt(Mid(CStr(strSounce), i, 1)) <> 0 Then

    If CInt(Mid(CStr(strSounce), i, 1)) Mod 2 = 0 Then

        intResult = intResult + 1
        
    End If
End If

Next
    
    CountEven = intResult

End Function

Function ConvertAlphaNumbersToNumber(ByVal strSource As String, ByVal Alphabet As String) As String

Dim i As Integer
Dim strResult As String

strSource = UCase(strSource)

For i = 1 To Len(strSource)

    If InStr(1, Alphabet, Mid(strSource, i, 1), vbTextCompare) <> 0 Then
        strResult = strResult + CStr(ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet))
    Else
        If InStr(1, "123456789", Mid(strSource, i, 1), vbTextCompare) <> 0 Then
            strResult = strResult + CStr(Mid(strSource, i, 1))
        End If
                
    End If

Next

ConvertAlphaNumbersToNumber = strResult


End Function


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

Function ConvertLettersToNumber(ByVal strSource As String, ByVal Alphabet As String) As Integer
 
Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

For i = 1 To Len(strSource)
   
   strResult = strResult + ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)
    
Next

    ConvertLettersToNumber = strResult
    
End Function

Function LettersToNumberArray(ByVal strSource As String, ByVal Alphabet As String) As String

Dim i As Integer
Dim strResult As String

For i = 1 To Len(strSource)

strResult = strResult + CStr(ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)) + " "


Next

LettersToNumberArray = strResult

End Function

Function CheckVowels(ByVal letter As String, ByVal Volwels As String) As Boolean
    Dim temp As Integer
    Dim result As Boolean
    
    result = False
    letter = UCase(letter)
    Volwels = UCase(Volwels)
    
    temp = InStr(1, Volwels, letter, vbTextCompare)
    
    If temp > 0 Then
        result = True
    End If
    
    CheckVowels = result
End Function


Function KarmahoroscopeRU(ByVal dtSource As Date) As String

Dim resutlt As String

Dim Aries As String

resutlt = "N/A"

Aries = ChrW(1054) & ChrW(1042) & ChrW(1045) & ChrW(1053)
'1/28/1949       8/17/1950
If dtSource >= CDate(#1/28/1949#) And dtSource < CDate(#8/17/1950#) Then
        resutlt = Aries
End If
'9/9/1967        3/29/1969
If dtSource >= CDate(#9/9/1967#) And dtSource < CDate(#3/29/1969#) Then
        resutlt = Aries
End If
'4/20/1986       11/8/1987
If dtSource >= CDate(#4/20/1986#) And dtSource < CDate(#11/8/1987#) Then
        resutlt = Aries
End If
       

Dim Taurus As String

Taurus = ChrW(1058) & ChrW(1045) & ChrW(1051) & ChrW(1045) & ChrW(1062) '&#1058;&#1045;&#1051;&#1045;&#1062;

'7/11/1947       1/28/1949
If dtSource >= CDate(#7/11/1947#) And dtSource < CDate(#1/28/1949#) Then
        resutlt = Taurus
End If
'2/19/1966       9/9/1967
If dtSource >= CDate(#2/19/1966#) And dtSource < CDate(#9/9/1967#) Then
        resutlt = Taurus
End If
'10/1/1984       4/20/1986
If dtSource >= CDate(#10/1/1984#) And dtSource < CDate(#4/20/1986#) Then
        resutlt = Taurus
End If
       

Dim Gemini As String

Gemini = ChrW(1041) & ChrW(1051) & ChrW(1048) & ChrW(1047) & ChrW(1053) & ChrW(1045) & ChrW(1062) & ChrW(1067)

'12/22/1945      7/11/1947
If dtSource >= CDate(#12/22/1945#) And dtSource < CDate(#7/11/1947#) Then
        resutlt = Gemini
End If
'8/2/1964        2/19/1966
If dtSource >= CDate(#8/2/1964#) And dtSource < CDate(#2/19/1966#) Then
        resutlt = Gemini
End If
'3/14/1983       10/1/1984
If dtSource >= CDate(#3/14/1983#) And dtSource < CDate(#10/1/1984#) Then
        resutlt = Gemini
End If
       
Dim Cancer As String

Cancer = ChrW(1056) & ChrW(1040) & ChrW(1050) '&#1056;&#1040;&#1050;

'6/3/1944        12/22/1945
If dtSource >= CDate(#6/3/1944#) And dtSource < CDate(#12/22/1945#) Then
        resutlt = Cancer
End If

'1/13/1963       8/2/1964
If dtSource >= CDate(#1/13/1963#) And dtSource < CDate(#8/2/1964#) Then
        resutlt = Cancer
End If

'8/25/1981       3/14/1983
If dtSource >= CDate(#8/25/1981#) And dtSource < CDate(#3/14/1983#) Then
        resutlt = Cancer
End If
       
'4/5/2000        10/24/2001
If dtSource >= CDate(#4/5/2000#) And dtSource < CDate(#10/24/2001#) Then
        resutlt = Cancer
End If


Dim Leo As String

Leo = ChrW(1051) & ChrW(1045) & ChrW(1042) '&#1051;&#1045;&#1042;

'11/15/1942      6/3/1944
If dtSource >= CDate(#11/15/1942#) And dtSource < CDate(#6/3/1944#) Then
        resutlt = Leo
End If
'6/26/1961       1/13/1963
If dtSource >= CDate(#6/26/1961#) And dtSource < CDate(#1/13/1963#) Then
        resutlt = Leo
End If
'2/5/1980        8/25/1981
If dtSource >= CDate(#2/5/1980#) And dtSource < CDate(#8/25/1981#) Then
        resutlt = Leo
End If
       
'9/17/1998       4/5/2000
If dtSource >= CDate(#9/17/1998#) And dtSource < CDate(#4/5/2000#) Then
        resutlt = Leo
End If

Dim Virgo As String

Virgo = ChrW(1044) & ChrW(1045) & ChrW(1042) & ChrW(1040)  '&#1044;&#1045;&#1042;&#1040;

'4/27/1941       11/15/1942
If dtSource >= CDate(#4/27/1941#) And dtSource < CDate(#11/15/1942#) Then
        resutlt = Virgo
End If
'12/7/1959       6/26/1961
If dtSource >= CDate(#12/7/1959#) And dtSource < CDate(#6/26/1961#) Then
        resutlt = Virgo
End If
'7/19/1978       2/5/1980
If dtSource >= CDate(#7/19/1978#) And dtSource < CDate(#2/5/1980#) Then
        resutlt = Virgo
End If
       
'2/27/1997       9/17/1998
If dtSource >= CDate(#2/27/1997#) And dtSource < CDate(#9/17/1998#) Then
        resutlt = Virgo
End If
       

Dim Libra As String

Libra = ChrW(1042) & ChrW(1045) & ChrW(1057) & ChrW(1067) '&#1042;&#1045;&#1057;&#1067;

'10/9/1939       4/27/1941
If dtSource >= CDate(#10/9/1939#) And dtSource < CDate(#4/27/1941#) Then
        resutlt = Libra
End If
'5/20/1958       12/7/1959
If dtSource >= CDate(#5/20/1958#) And dtSource < CDate(#12/7/1959#) Then
        resutlt = Libra
End If
'12/29/1976      7/19/1978
If dtSource >= CDate(#12/29/1976#) And dtSource < CDate(#7/19/1978#) Then
        resutlt = Libra
End If
       
'8/11/1995       2/27/1997
If dtSource >= CDate(#8/11/1995#) And dtSource < CDate(#2/27/1997#) Then
        resutlt = Libra
End If
       

Dim Scorpio As String

Scorpio = ChrW(1057) & ChrW(1050) & ChrW(1054) & ChrW(1056) & ChrW(1055) & ChrW(1048) & ChrW(1054) & ChrW(1053) '&#1057;&#1050;&#1054;&#1056;&#1055;&#1048;&#1054;&#1053;

'3/21/1938       10/9/1939
If dtSource >= CDate(#3/21/1938#) And dtSource < CDate(#10/9/1939#) Then
        resutlt = Scorpio
End If
'10/30/1956      5/20/1958
If dtSource >= CDate(#10/30/1956#) And dtSource < CDate(#5/20/1958#) Then
        resutlt = Scorpio
End If
'6/12/1975       12/29/1976
If dtSource >= CDate(#6/12/1975#) And dtSource < CDate(#12/29/1976#) Then
        resutlt = Scorpio
End If
       
'1/21/1994       8/11/1995
If dtSource >= CDate(#1/21/1994#) And dtSource < CDate(#8/11/1995#) Then
        resutlt = Scorpio
End If
       

    
Dim Sagittarius As String

Sagittarius = ChrW(1057) & ChrW(1058) & ChrW(1056) & ChrW(1045) & ChrW(1051) & ChrW(1045) & ChrW(1062) '&#1057;&#1058;&#1056;&#1045;&#1051;&#1045;&#1062;

'9/1/1936        3/21/1938
If dtSource >= CDate(#9/1/1936#) And dtSource < CDate(#3/21/1938#) Then
        resutlt = Sagittarius
End If
'4/13/1955       10/30/1956
If dtSource >= CDate(#4/13/1955#) And dtSource < CDate(#10/30/1956#) Then
        resutlt = Sagittarius
End If
'11/22/1973      6/12/1975
If dtSource >= CDate(#11/22/1973#) And dtSource < CDate(#6/12/1975#) Then
        resutlt = Sagittarius
End If
       
'7/4/1992        1/21/1994
If dtSource >= CDate(#7/4/1992#) And dtSource < CDate(#1/21/1994#) Then
        resutlt = Sagittarius
End If
       

Dim Capricorn As String

Capricorn = ChrW(1050) & ChrW(1054) & ChrW(1047) & ChrW(1045) & ChrW(1056) & ChrW(1054) & ChrW(1043) '&#1050;&#1054;&#1047;&#1045;&#1056;&#1054;&#1043;

'2/12/1935       9/1/1936
If dtSource >= CDate(#2/12/1935#) And dtSource < CDate(#9/1/1936#) Then
        resutlt = Capricorn
End If
'9/23/1953       4/13/1955
If dtSource >= CDate(#9/23/1953#) And dtSource < CDate(#4/13/1955#) Then
        resutlt = Capricorn
End If
'5/4/1972        11/22/1973
If dtSource >= CDate(#5/4/1972#) And dtSource < CDate(#11/22/1973#) Then
        resutlt = Capricorn
End If
       
'12/15/1990      7/4/1992
If dtSource >= CDate(#12/15/1990#) And dtSource < CDate(#7/4/1992#) Then
        resutlt = Capricorn
End If
       

Dim Aquarius As String

Aquarius = ChrW(1042) & ChrW(1054) & ChrW(1044) & ChrW(1054) & ChrW(1051) & ChrW(1045) & ChrW(1049) '&#1042;&#1054;&#1044;&#1054;&#1051;&#1045;&#1049;

'7/25/1933       2/12/1935
If dtSource >= CDate(#7/25/1933#) And dtSource < CDate(#2/12/1935#) Then
        resutlt = Aquarius
End If
'3/6/1952        9/23/1953
If dtSource >= CDate(#3/6/1952#) And dtSource < CDate(#9/23/1953#) Then
        resutlt = Aquarius
End If
'10/16/1970      5/4/1972
If dtSource >= CDate(#10/16/1970#) And dtSource < CDate(#5/4/1972#) Then
        resutlt = Aquarius
End If
       
'5/28/1989       12/15/1990
If dtSource >= CDate(#5/28/1989#) And dtSource < CDate(#12/15/1990#) Then
        resutlt = Aquarius
End If

Dim Pisces As String

Pisces = ChrW(1056) & ChrW(1067) & ChrW(1041) & ChrW(1067) '&#1056;&#1067;&#1041;&#1067;

'1/6/1932        7/25/1933
If dtSource >= CDate(#1/6/1932#) And dtSource < CDate(#7/25/1933#) Then
        resutlt = Pisces
End If
'8/17/1950       3/6/1952
If dtSource >= CDate(#8/17/1950#) And dtSource < CDate(#3/6/1952#) Then
        resutlt = Pisces
End If
'3/29/1969       10/16/1970
If dtSource >= CDate(#3/29/1969#) And dtSource < CDate(#10/16/1970#) Then
        resutlt = Pisces
End If
       
'11/8/1987       5/28/1989
If dtSource >= CDate(#11/8/1987#) And dtSource < CDate(#5/28/1989#) Then
        resutlt = Pisces
End If
 
KarmahoroscopeRU = resutlt


End Function



Function KarmaDiseaseHoroscopeRU(ByVal dtSource As Date) As String

Dim resutlt As String

Dim Aries As String

resutlt = "N/A"

Aries = ChrW(1054) & ChrW(1042) & ChrW(1045) & ChrW(1053)

If dtSource >= CDate(#8/7/1931#) And dtSource <= CDate(#5/2/1932#) Then
        resutlt = Aries
End If

If dtSource >= CDate(#6/12/1940#) And dtSource <= CDate(#3/7/1941#) Then
        resutlt = Aries
End If

If dtSource >= CDate(#4/17/1949#) And dtSource <= CDate(#1/10/1950#) Then
        resutlt = Aries
End If
       
If dtSource >= CDate(#2/20/1958#) And dtSource <= CDate(#11/17/1958#) Then
        resutlt = Aries
End If
       
If dtSource >= CDate(#12/27/1966#) And dtSource <= CDate(#9/22/1967#) Then
        resutlt = Aries
End If

If dtSource >= CDate(#11/1/1975#) And dtSource <= CDate(#7/28/1976#) Then
        resutlt = Aries
End If

If dtSource >= CDate(#9/7/1984#) And dtSource <= CDate(#7/2/1985#) Then
        resutlt = Aries
End If

If dtSource >= CDate(#7/13/1993#) And dtSource <= CDate(#4/8/1994#) Then
        resutlt = Aries
End If

'5/18/2002       2/11/2003
If dtSource >= CDate(#5/18/2002#) And dtSource <= CDate(#2/11/2003#) Then
        resutlt = Aries
End If

Dim Taurus As String

Taurus = ChrW(1058) & ChrW(1045) & ChrW(1051) & ChrW(1045) & ChrW(1062) '&#1058;&#1045;&#1051;&#1045;&#1062;

'5/3/1932        1/26/1993
If dtSource >= CDate(#5/3/1932#) And dtSource <= CDate(#1/26/1933#) Then
        resutlt = Taurus
End If
'3/8/1941        12/2/1941
If dtSource >= CDate(#3/8/1941#) And dtSource <= CDate(#12/2/1941#) Then
        resutlt = Taurus
End If
'1/11/1950       10/6/1950
If dtSource >= CDate(#1/11/1950#) And dtSource <= CDate(#10/6/1950#) Then
        resutlt = Taurus
End If
       
'11/17/1958      8/12/1959
If dtSource >= CDate(#11/17/1958#) And dtSource <= CDate(#8/12/1959#) Then
        resutlt = Taurus
End If
       
'9/22/1967       6/17/1968
If dtSource >= CDate(#9/22/1967#) And dtSource <= CDate(#6/17/1968#) Then
        resutlt = Taurus
End If

'7/28/1976       4/23/1977
If dtSource >= CDate(#7/28/1976#) And dtSource <= CDate(#4/23/1977#) Then
        resutlt = Taurus
End If

'6/2/1985        2/25/1986
If dtSource >= CDate(#6/2/1985#) And dtSource <= CDate(#2/25/1986#) Then
        resutlt = Taurus
End If

'4/8/1994        1/2/1995
If dtSource >= CDate(#4/8/1994#) And dtSource <= CDate(#1/2/1995#) Then
        resutlt = Taurus
End If

'2/12/2003       11/7/2003
If dtSource >= CDate(#2/12/2003#) And dtSource <= CDate(#11/7/2003#) Then
        resutlt = Taurus
End If

Dim Gemini As String

Gemini = ChrW(1041) & ChrW(1051) & ChrW(1048) & ChrW(1047) & ChrW(1053) & ChrW(1045) & ChrW(1062) & ChrW(1067)

'1/27/1933       10/22/1933
If dtSource >= CDate(#1/27/1933#) And dtSource <= CDate(#10/22/1933#) Then
        resutlt = Gemini
End If
'12/3/1941       8/27/1942
If dtSource >= CDate(#12/3/1941#) And dtSource <= CDate(#8/27/1942#) Then
        resutlt = Gemini
End If
'10/7/1950       7/3/1951
If dtSource >= CDate(#10/7/1950#) And dtSource <= CDate(#7/3/1951#) Then
        resutlt = Gemini
End If
       
'8/13/1959       5/9/1960
If dtSource >= CDate(#8/13/1959#) And dtSource <= CDate(#5/9/1960#) Then
        resutlt = Gemini
End If
       
'6/17/1968       3/13/1969
If dtSource >= CDate(#6/17/1968#) And dtSource <= CDate(#3/13/1969#) Then
        resutlt = Gemini
End If

'4/23/1977       1/16/1978
If dtSource >= CDate(#4/23/1977#) And dtSource <= CDate(#1/16/1978#) Then
        resutlt = Gemini
End If

'2/26/1986       11/23/1986
If dtSource >= CDate(#2/26/1986#) And dtSource <= CDate(#11/23/1986#) Then
        resutlt = Gemini
End If

'1/2/1995        9/28/1995
If dtSource >= CDate(#1/2/1995#) And dtSource <= CDate(#9/28/1995#) Then
        resutlt = Gemini
End If

'11/8/2003       8/2/2004
If dtSource >= CDate(#11/8/2003#) And dtSource <= CDate(#8/2/2004#) Then
        resutlt = Gemini
End If


Dim Cancer As String

Cancer = ChrW(1056) & ChrW(1040) & ChrW(1050) '&#1056;&#1040;&#1050;

'10/23/1933      7/18/1934
If dtSource >= CDate(#10/23/1933#) And dtSource <= CDate(#7/18/1934#) Then
        resutlt = Cancer
End If

'8/28/1942       5/24/1943
If dtSource >= CDate(#8/28/1942#) And dtSource <= CDate(#5/24/1943#) Then
        resutlt = Cancer
End If

'7/3/1951        3/29/1952
If dtSource >= CDate(#7/3/1951#) And dtSource <= CDate(#3/29/1952#) Then
        resutlt = Cancer
End If
       

If dtSource >= CDate(#5/10/1960#) And dtSource <= CDate(#1/31/1961#) Then
        resutlt = Cancer
End If
       
'3/14/1969       2/8/1969
If dtSource >= CDate(#3/14/1969#) And dtSource <= CDate(#12/8/1969#) Then
        resutlt = Cancer
End If


'1/17/1978       10/13/1978
If dtSource >= CDate(#1/17/1978#) And dtSource <= CDate(#10/13/1978#) Then
        resutlt = Cancer
End If


'11/23/1986      8/18/1987
If dtSource >= CDate(#11/23/1986#) And dtSource <= CDate(#8/18/1987#) Then
        resutlt = Cancer
End If

'9/29/1995       7/24/1996
If dtSource >= CDate(#9/29/1995#) And dtSource <= CDate(#7/24/1996#) Then
        resutlt = Cancer
End If

'8/3/2004        4/28/2005
If dtSource >= CDate(#8/3/2004#) And dtSource <= CDate(#4/28/2005#) Then
        resutlt = Cancer
End If

Dim Leo As String

Leo = ChrW(1051) & ChrW(1045) & ChrW(1042) '&#1051;&#1045;&#1042;

'6/18/1934       4/13/1935
If dtSource >= CDate(#6/18/1934#) And dtSource <= CDate(#4/13/1935#) Then
        resutlt = Leo
End If
'5/25/1943       2/17/1944
If dtSource >= CDate(#5/25/1943#) And dtSource <= CDate(#2/17/1944#) Then
        resutlt = Leo
End If
'3/30/1952       12/23/1952
If dtSource >= CDate(#3/30/1952#) And dtSource <= CDate(#12/23/1952#) Then
        resutlt = Leo
End If
       
'2/1/1961        10/28/1961
If dtSource >= CDate(#2/1/1961#) And dtSource <= CDate(#10/28/1961#) Then
        resutlt = Leo
End If
       
'12/8/1969       9/2/1970
If dtSource >= CDate(#12/8/1969#) And dtSource <= CDate(#9/2/1970#) Then
        resutlt = Leo
End If

'10/14/1978      7/9/1979
If dtSource >= CDate(#10/14/1978#) And dtSource <= CDate(#7/9/1979#) Then
        resutlt = Leo
End If

'8/19/1987       5/14/1988
If dtSource >= CDate(#8/19/1987#) And dtSource <= CDate(#5/14/1988#) Then
        resutlt = Leo
End If

'7/25/1996       3/19/1997
If dtSource >= CDate(#7/25/1996#) And dtSource <= CDate(#3/19/1997#) Then
        resutlt = Leo
End If

'4/29/2005       1/22/2006
If dtSource >= CDate(#4/29/2005#) And dtSource <= CDate(#1/22/2006#) Then
        resutlt = Leo
End If

Dim Virgo As String

Virgo = ChrW(1044) & ChrW(1045) & ChrW(1042) & ChrW(1040)  '&#1044;&#1045;&#1042;&#1040;

'4/14/1935       1/8/1936
If dtSource >= CDate(#4/14/1935#) And dtSource <= CDate(#1/8/1936#) Then
        resutlt = Virgo
End If
'2/17/1944       11/13/1944
If dtSource >= CDate(#2/17/1944#) And dtSource <= CDate(#11/13/1944#) Then
        resutlt = Virgo
End If
'12/24/1952      9/18/1953
If dtSource >= CDate(#12/24/1952#) And dtSource <= CDate(#9/18/1953#) Then
        resutlt = Virgo
End If
       
'10/29/1961      7/15/1962
If dtSource >= CDate(#10/29/1961#) And dtSource <= CDate(#7/15/1962#) Then
        resutlt = Virgo
End If
       
'9/3/1970        5/30/1971
If dtSource >= CDate(#9/3/1970#) And dtSource <= CDate(#5/30/1971#) Then
        resutlt = Virgo
End If

'7/10/1979       4/5/1980
If dtSource >= CDate(#7/10/1979#) And dtSource <= CDate(#4/5/1980#) Then
        resutlt = Virgo
End If

'5/15/1988       2/8/1989
If dtSource >= CDate(#5/15/1988#) And dtSource <= CDate(#2/8/1989#) Then
        resutlt = Virgo
End If

'3/20/1997       12/14/1997
If dtSource >= CDate(#3/20/1997#) And dtSource <= CDate(#12/14/1997#) Then
        resutlt = Virgo
End If

'1/23/2006       10/18/2006
If dtSource >= CDate(#1/23/2006#) And dtSource <= CDate(#10/18/2006#) Then
        resutlt = Virgo
End If

Dim Libra As String

Libra = ChrW(1042) & ChrW(1045) & ChrW(1057) & ChrW(1067) '&#1042;&#1045;&#1057;&#1067;

'1/8/1936        10/4/1936
If dtSource >= CDate(#1/8/1936#) And dtSource <= CDate(#10/4/1936#) Then
        resutlt = Libra
End If
'11/14/1944      8/8/1945
If dtSource >= CDate(#11/14/1944#) And dtSource <= CDate(#8/8/1945#) Then
        resutlt = Libra
End If
'9/18/1953       6/14/1954
If dtSource >= CDate(#9/18/1953#) And dtSource <= CDate(#6/14/1954#) Then
        resutlt = Libra
End If
       
'7/16/1962       4/19/1963
If dtSource >= CDate(#7/16/1962#) And dtSource <= CDate(#4/19/1963#) Then
        resutlt = Libra
End If
       
'5/30/1971       2/23/1972
If dtSource >= CDate(#5/30/1971#) And dtSource <= CDate(#2/23/1972#) Then
        resutlt = Libra
End If

'4/5/1980        12/29/1980
If dtSource >= CDate(#4/5/1980#) And dtSource <= CDate(#12/29/1980#) Then
        resutlt = Libra
End If

'2/8/1989        11/3/1989
If dtSource >= CDate(#2/8/1989#) And dtSource <= CDate(#11/3/1989#) Then
        resutlt = Libra
End If

'12/14/1997      9/9/1998
If dtSource >= CDate(#12/14/1997#) And dtSource <= CDate(#9/9/1998#) Then
        resutlt = Libra
End If

'10/19/2006      7/15/2007
If dtSource >= CDate(#10/19/2006#) And dtSource <= CDate(#7/15/2007#) Then
        resutlt = Libra
End If

Dim Scorpio As String

Scorpio = ChrW(1057) & ChrW(1050) & ChrW(1054) & ChrW(1056) & ChrW(1055) & ChrW(1048) & ChrW(1054) & ChrW(1053) '&#1057;&#1050;&#1054;&#1056;&#1055;&#1048;&#1054;&#1053;

'10/5/1936       6/29/1937
If dtSource >= CDate(#10/5/1936#) And dtSource <= CDate(#6/29/1937#) Then
        resutlt = Scorpio
End If
'8/9/1945        5/5/1946
If dtSource >= CDate(#8/9/1945#) And dtSource <= CDate(#5/5/1946#) Then
        resutlt = Scorpio
End If
'6/14/1954       3/10/1955
If dtSource >= CDate(#6/14/1954#) And dtSource <= CDate(#3/10/1955#) Then
        resutlt = Scorpio
End If
       
'4/20/1963       1/13/1964
If dtSource >= CDate(#4/20/1963#) And dtSource <= CDate(#1/13/1964#) Then
        resutlt = Scorpio
End If
       
'2/23/1972       11/19/1972
If dtSource >= CDate(#2/23/1972#) And dtSource <= CDate(#11/19/1972#) Then
        resutlt = Scorpio
End If

'12/29/1980      9/24/1981
If dtSource >= CDate(#12/29/1980#) And dtSource <= CDate(#9/24/1981#) Then
        resutlt = Scorpio
End If

'11/4/1989       8/2/1990
If dtSource >= CDate(#11/4/1989#) And dtSource <= CDate(#8/2/1990#) Then
        resutlt = Scorpio
End If

'9/10/1998       6/5/1999
If dtSource >= CDate(#9/10/1998#) And dtSource <= CDate(#6/5/1999#) Then
        resutlt = Scorpio
End If

'7/16/2007       4/9/2008
If dtSource >= CDate(#7/16/2007#) And dtSource <= CDate(#4/9/2008#) Then
        resutlt = Scorpio
End If

    
Dim Sagittarius As String

Sagittarius = ChrW(1057) & ChrW(1058) & ChrW(1056) & ChrW(1045) & ChrW(1051) & ChrW(1045) & ChrW(1062) '&#1057;&#1058;&#1056;&#1045;&#1051;&#1045;&#1062;

'6/30/1937       3/26/1938
If dtSource >= CDate(#6/30/1937#) And dtSource <= CDate(#3/26/1938#) Then
        resutlt = Sagittarius
End If
'5/5/1946        1/29/1947
If dtSource >= CDate(#5/5/1946#) And dtSource <= CDate(#1/29/1947#) Then
        resutlt = Sagittarius
End If
'3/10/1955       12/4/1955
If dtSource >= CDate(#3/10/1955#) And dtSource <= CDate(#12/4/1955#) Then
        resutlt = Sagittarius
End If
       
'1/14/1964       10/20/1964
If dtSource >= CDate(#1/14/1964#) And dtSource <= CDate(#10/20/1964#) Then
        resutlt = Sagittarius
End If
       
'11/20/1972      8/14/1973
If dtSource >= CDate(#11/20/1972#) And dtSource <= CDate(#8/14/1973#) Then
        resutlt = Sagittarius
End If

'9/24/1981       6/20/1982
If dtSource >= CDate(#9/24/1981#) And dtSource <= CDate(#6/20/1982#) Then
        resutlt = Sagittarius
End If

'8/3/1990        4/30/1991
If dtSource >= CDate(#8/3/1990#) And dtSource <= CDate(#4/30/1991#) Then
        resutlt = Sagittarius
End If

'6/6/1999        3/3/2000
If dtSource >= CDate(#6/6/1999#) And dtSource <= CDate(#3/3/2000#) Then
        resutlt = Sagittarius
End If

'4/10/2008       1/3/2009
If dtSource >= CDate(#4/10/2008#) And dtSource <= CDate(#1/3/2009#) Then
        resutlt = Sagittarius
End If


Dim Capricorn As String

Capricorn = ChrW(1050) & ChrW(1054) & ChrW(1047) & ChrW(1045) & ChrW(1056) & ChrW(1054) & ChrW(1043) '&#1050;&#1054;&#1047;&#1045;&#1056;&#1054;&#1043;

'3/27/1938       12/20/1938
If dtSource >= CDate(#3/27/1938#) And dtSource <= CDate(#12/20/1938#) Then
        resutlt = Capricorn
End If
'1/30/1947       10/25/1947
If dtSource >= CDate(#1/30/1947#) And dtSource <= CDate(#10/25/1947#) Then
        resutlt = Capricorn
End If
'12/5/1955       9/1/1956
If dtSource >= CDate(#12/5/1955#) And dtSource <= CDate(#9/1/1956#) Then
        resutlt = Capricorn
End If
       
'10/20/1964      7/5/1965
If dtSource >= CDate(#10/20/1964#) And dtSource <= CDate(#7/5/1965#) Then
        resutlt = Capricorn
End If
       
'8/15/1973       5/12/1974
If dtSource >= CDate(#8/15/1973#) And dtSource <= CDate(#5/12/1974#) Then
        resutlt = Capricorn
End If

'6/20/1982       3/16/1983
If dtSource >= CDate(#6/20/1982#) And dtSource <= CDate(#3/16/1983#) Then
        resutlt = Capricorn
End If

'5/1/1991        1/21/1992
If dtSource >= CDate(#5/1/1991#) And dtSource <= CDate(#1/21/1992#) Then
        resutlt = Capricorn
End If

'3/3/2000        11/27/2000
If dtSource >= CDate(#3/3/2000#) And dtSource <= CDate(#11/27/2000#) Then
        resutlt = Capricorn
End If

'1/4/2009        9/30/2009
If dtSource >= CDate(#1/4/2009#) And dtSource <= CDate(#9/30/2009#) Then
        resutlt = Capricorn
End If

Dim Aquarius As String

Aquarius = ChrW(1042) & ChrW(1054) & ChrW(1044) & ChrW(1054) & ChrW(1051) & ChrW(1045) & ChrW(1049) '&#1042;&#1054;&#1044;&#1054;&#1051;&#1045;&#1049;

'12/20/1938      9/15/1939
If dtSource >= CDate(#12/20/1938#) And dtSource <= CDate(#9/15/1939#) Then
        resutlt = Aquarius
End If
'10/26/1947      7/23/1948
If dtSource >= CDate(#10/26/1947#) And dtSource <= CDate(#7/23/1948#) Then
        resutlt = Aquarius
End If
'9/1/1956        5/27/1957
If dtSource >= CDate(#9/1/1956#) And dtSource <= CDate(#5/27/1957#) Then
        resutlt = Aquarius
End If
       
'7/6/1965        4/1/1966
If dtSource >= CDate(#7/6/1965#) And dtSource <= CDate(#4/1/1966#) Then
        resutlt = Aquarius
End If
       
'5/12/1974       2/4/1975
If dtSource >= CDate(#5/12/1974#) And dtSource <= CDate(#2/4/1975#) Then
        resutlt = Aquarius
End If

'3/17/1983       12/12/1983
If dtSource >= CDate(#3/17/1983#) And dtSource <= CDate(#12/12/1983#) Then
        resutlt = Aquarius
End If

'1/22/1992       10/17/1992
If dtSource >= CDate(#1/22/1992#) And dtSource <= CDate(#10/17/1992#) Then
        resutlt = Aquarius
End If

'11/28/2000      8/22/2001
If dtSource >= CDate(#11/28/2000#) And dtSource <= CDate(#8/22/2001#) Then
        resutlt = Aquarius
End If

'10/1/2009       6/26/2010
If dtSource >= CDate(#10/1/2009#) And dtSource <= CDate(#6/26/2010#) Then
        resutlt = Aquarius
End If

Dim Pisces As String

Pisces = ChrW(1056) & ChrW(1067) & ChrW(1041) & ChrW(1067) '&#1056;&#1067;&#1041;&#1067;

'11/10/1930      8/6/1931
If dtSource >= CDate(#11/10/1930#) And dtSource <= CDate(#8/6/1931#) Then
        resutlt = Pisces
End If
'9/16/1939       6/12/1940
If dtSource >= CDate(#9/16/1939#) And dtSource <= CDate(#6/12/1940#) Then
        resutlt = Pisces
End If
'5/27/1957       2/20/1958
If dtSource >= CDate(#5/27/1957#) And dtSource <= CDate(#2/20/1958#) Then
        resutlt = Pisces
End If
       
'4/1/1966        12/27/1966
If dtSource >= CDate(#4/1/1966#) And dtSource <= CDate(#12/27/1966#) Then
        resutlt = Pisces
End If
       
'2/5/1975        10/31/1975
If dtSource >= CDate(#2/5/1975#) And dtSource <= CDate(#10/31/1975#) Then
        resutlt = Pisces
End If

'12/12/1983      9/7/1984
If dtSource >= CDate(#12/12/1983#) And dtSource <= CDate(#9/7/1984#) Then
        resutlt = Pisces
End If

'10/18/1992      7/13/1993
If dtSource >= CDate(#10/18/1992#) And dtSource <= CDate(#7/13/1993#) Then
        resutlt = Pisces
End If

'8/23/2001       5/17/2002
If dtSource >= CDate(#8/23/2001#) And dtSource <= CDate(#5/17/2002#) Then
        resutlt = Pisces
End If

'10/1/2009       6/26/2010
'If dtSource >= CDate(#10/1/2009#) And dtSource <= CDate(#6/26/2010#) Then
'        resutlt = Pisces
'End If

KarmaDiseaseHoroscopeRU = resutlt


End Function




Function ArrayRepeatNum(ByVal strNum As String, ByVal intNum As Integer) As String

Dim i As Integer
Dim strResult As String

If intNum = 0 Then

strResult = ChrW(1085) + ChrW(1077) + ChrW(1090)  ' "-" ChrW(1053) + ChrW(1045) + ChrW(1058)

Else


For i = 1 To intNum


strResult = strResult + strNum + " "

Next

End If

ArrayRepeatNum = strResult

End Function

Function CountNumber(ByVal strSource As String, ByVal Number As Integer) As Integer

Dim i As Integer
Dim strResult As Integer
Dim tempString As String

strResult = 0

For i = 1 To Len(strSource)

tempString = Mid(strSource, i, 1)

If tempString <> " " Then

If CInt(tempString) = Number Then

strResult = strResult + 1

End If

End If

Next

CountNumber = strResult

End Function


Function CalculateInt(ByVal T1 As Single, ByVal T2 As Single, ByVal K1 As Single, ByVal K2 As Single, ByVal Kper As Single) As Single

Dim P1 As Single

If K2 >= Kper And Kper > K1 Then

'=((ABS((H6-G6))/ABS((H5-G5)))*ABS(H7-G5))+G6

    P1 = (Abs(T2 - T1) / Abs(K2 - K1) * Abs(Kper - K1)) + T1
Else

    If K1 >= Kper And Kper > K2 Then
        P1 = (Abs(T2 - T1) / Abs(K2 - K1) * Abs(Kper - K1)) + T1
    
    End If

End If

CalculateInt = P1

End Function
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

Function ConvertLetterToNumberRU(ByVal strSource As String) As Integer
' https://unicode-table.com/en/#0417
Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

For i = 1 To Len(strSource)
    Select Case Mid(strSource, i, 1)
        Case ChrW(1040):
            strResult = strResult + 1
        Case ChrW(1041):
            strResult = strResult + 2
        Case ChrW(1042):
            strResult = strResult + 3
         Case ChrW(1043):
            strResult = strResult + 4
         Case ChrW(1044):
            strResult = strResult + 5
         Case ChrW(1045):
            strResult = strResult + 6
         Case ChrW(1025):
            strResult = strResult + 7
         Case ChrW(1046):
            strResult = strResult + 8
         Case ChrW(1047):
            strResult = strResult + 9
        
         Case ChrW(1048):
            strResult = strResult + 1
         Case ChrW(1049):
            strResult = strResult + 2
         Case ChrW(1050):
            strResult = strResult + 3
         Case ChrW(1051):
            strResult = strResult + 4
         Case ChrW(1052):
            strResult = strResult + 5
         Case ChrW(1053):
            strResult = strResult + 6
         Case ChrW(1054):
            strResult = strResult + 7
         Case ChrW(1055):
            strResult = strResult + 8
         Case ChrW(1056):
            strResult = strResult + 9
         Case ChrW(1057):
            strResult = strResult + 1
         Case ChrW(1058):
            strResult = strResult + 2
         Case ChrW(1059):
            strResult = strResult + 3
         Case ChrW(1060):
            strResult = strResult + 4
         Case ChrW(1061):
            strResult = strResult + 5
         Case ChrW(1062):
            strResult = strResult + 6
         Case ChrW(1063):
            strResult = strResult + 7
         Case ChrW(1064):
            strResult = strResult + 8
         Case ChrW(1065):
            strResult = strResult + 9
         Case ChrW(1066):
            strResult = strResult + 1
         Case ChrW(1067):
            strResult = strResult + 2
         Case ChrW(1068):
            strResult = strResult + 3
         Case ChrW(1069):
            strResult = strResult + 4
         Case ChrW(1070):
            strResult = strResult + 5
         Case ChrW(1071):
            strResult = strResult + 6
            
    End Select
Next



ConvertLetterToNumberRU = strResult

End Function


Function SolarDate(ByVal DOB As Date, ByVal OtherDate As Date) As Date


Dim currentDate As Date
Dim solarYear As Integer
Dim tmpDate As Date

tmpDate = DateSerial(year(OtherDate), month(DOB), Day(DOB))

If tmpDate > OtherDate Then

tmpDate = DateSerial(year(OtherDate) - 1, month(DOB), Day(DOB))

End If


SolarDate = tmpDate

End Function

Function KarmicShadow(ByVal DOB As Date, ByVal OtherDate As Date, ByVal OPV As Integer) As Integer

Dim tmpNumber As Integer
Dim tmpDate As Date

tmpNumber = 1
tmpDate = DOB
OtherDate = DateAdd("yyyy", -OPV, OtherDate)

Do While tmpDate < OtherDate

tmpDate = DateAdd("yyyy", OPV, tmpDate)
tmpNumber = tmpNumber * -1

Loop

KarmicShadow = tmpNumber

End Function



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

Function CalcOPV(ByVal DOB As Integer) As Integer

Dim result As Integer
 
If DOB >= 14 And DOB <= 22 Then
    result = DOB
End If
    
CalcOPV = result

End Function



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

Function NumberTo9(ByVal intSource As Integer) As Integer

    Do While intSource > 9
         intSource = SumNumbers(intSource)
    Loop
    
    NumberTo9 = intSource

End Function

Function SumNumbers(ByVal intSource As Long) As Long

Dim i As Integer
Dim intResult As Integer
Dim sign As Integer

sign = 1

If intSource < 0 Then
    sign = -1
    intSource = Abs(intSource)
End If

For i = 1 To Len(CStr(intSource))

intResult = intResult + CInt(Mid(CStr(intSource), i, 1))

Next
    
    SumNumbers = intResult * sign

End Function

Function SumNumbersStr(ByVal intSource As String) As Long

Dim i As Integer
Dim intResult As Integer

For i = 1 To Len(CStr(intSource))

If IsNumeric(Mid(CStr(intSource), i, 1)) Then

intResult = intResult + CInt(Mid(CStr(intSource), i, 1))

End If

Next

  
    SumNumbersStr = intResult

End Function


Function LetterToNumberArrayRU(ByVal strSource As String) As String

Dim i As Integer
Dim strResult As String

For i = 1 To Len(strSource)

strResult = strResult + CStr(ConvertLetterToNumberRU(Mid(strSource, i, 1))) + " "


Next

LetterToNumberArrayRU = strResult

End Function

Function VowelsToNumberRU(ByVal strSource As String) As Integer
' https://unicode-table.com/en/#0417
Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

For i = 1 To Len(strSource)

If CheckVowel(Mid(strSource, i, 1)) = 1 Then

strResult = strResult + ConvertLetterToNumberRU(Mid(strSource, i, 1))

End If

Next

VowelsToNumberRU = strResult

End Function

Function VowelsToNumber(ByVal strSource As String, ByVal Alphabet As String, ByVal Volwels As String) As Integer
' https://unicode-table.com/en/#0417
Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

For i = 1 To Len(strSource)

If CheckVowels(Mid(strSource, i, 1), Volwels) Then

strResult = strResult + ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)

End If

Next

VowelsToNumber = strResult

End Function



Function ConsonantToNumberRU(ByVal strSource As String) As Integer
' https://unicode-table.com/en/#0417
Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

For i = 1 To Len(strSource)

If CheckVowel(Mid(strSource, i, 1)) = 0 Then

strResult = strResult + ConvertLetterToNumberRU(Mid(strSource, i, 1))

End If

Next

ConsonantToNumberRU = strResult

End Function

Function ConsonantsToNumber(ByVal strSource As String, ByVal Alphabet As String, ByVal Volwels As String) As Integer
' https://unicode-table.com/en/#0417
Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

For i = 1 To Len(strSource)

If Not CheckVowels(Mid(strSource, i, 1), Volwels) Then

strResult = strResult + ConvertLetterToNumber(Mid(strSource, i, 1), Alphabet)

End If

Next

ConsonantsToNumber = strResult

End Function

Function CheckVowel(ByVal strSource As String) As Integer

Dim i As Integer
Dim strResult As Integer

strSource = UCase(strSource)

    Select Case UCase(strSource)
        Case ChrW(1040):
            strResult = 1
        Case ChrW(1041):
            strResult = 0
        Case ChrW(1042):
            strResult = 0
         Case ChrW(1043):
            strResult = 0
         Case ChrW(1044):
            strResult = 0
         Case ChrW(1045):
            strResult = 1
         Case ChrW(1025):
            strResult = 1
         Case ChrW(1046):
            strResult = 0
         Case ChrW(1047):
            strResult = 0
         Case ChrW(1048):
            strResult = 1
         Case ChrW(1049):
            strResult = 0
         Case ChrW(1050):
            strResult = 0
         Case ChrW(1051):
            strResult = 0
         Case ChrW(1052):
            strResult = 0
         Case ChrW(1053):
            strResult = 0
         Case ChrW(1054):
            strResult = 1
         Case ChrW(1055):
            strResult = 0
         Case ChrW(1056):
            strResult = 0
         Case ChrW(1057):
            strResult = 0
         Case ChrW(1058):
            strResult = 0
         Case ChrW(1059):
            strResult = 1
         Case ChrW(1060):
            strResult = 0
         Case ChrW(1061):
            strResult = 0
         Case ChrW(1062):
            strResult = 0
         Case ChrW(1063):
            strResult = 0
         Case ChrW(1064):
            strResult = 0
         Case ChrW(1065):
            strResult = 0
         Case ChrW(1066):
            strResult = 0
         Case ChrW(1067):
            strResult = 1
         Case ChrW(1068):
            strResult = 0
         Case ChrW(1069):
            strResult = 1
         Case ChrW(1070):
            strResult = 1
         Case ChrW(1071):
            strResult = 1
            
    End Select


CheckVowel = strResult

End Function


Function GetInfoYear(LunarYear As Integer, Index As Integer) As Long

Dim yearArray(1901 To 2050, 0 To 3) As Long

yearArray(1901, 0) = 0
yearArray(1901, 1) = 2
yearArray(1901, 2) = 19
yearArray(1901, 3) = 19168
yearArray(1902, 0) = 0
yearArray(1902, 1) = 2
yearArray(1902, 2) = 8
yearArray(1902, 3) = 42352
yearArray(1903, 0) = 5
yearArray(1903, 1) = 1
yearArray(1903, 2) = 29
yearArray(1903, 3) = 21096
yearArray(1904, 0) = 0
yearArray(1904, 1) = 2
yearArray(1904, 2) = 16
yearArray(1904, 3) = 53856
yearArray(1905, 0) = 0
yearArray(1905, 1) = 2
yearArray(1905, 2) = 4
yearArray(1905, 3) = 55632
yearArray(1906, 0) = 4
yearArray(1906, 1) = 1
yearArray(1906, 2) = 25
yearArray(1906, 3) = 27304
yearArray(1907, 0) = 0
yearArray(1907, 1) = 2
yearArray(1907, 2) = 13
yearArray(1907, 3) = 22176
yearArray(1908, 0) = 0
yearArray(1908, 1) = 2
yearArray(1908, 2) = 2
yearArray(1908, 3) = 39632
yearArray(1909, 0) = 2
yearArray(1909, 1) = 1
yearArray(1909, 2) = 22
yearArray(1909, 3) = 19176
yearArray(1910, 0) = 0
yearArray(1910, 1) = 2
yearArray(1910, 2) = 10
yearArray(1910, 3) = 19168
yearArray(1911, 0) = 6
yearArray(1911, 1) = 1
yearArray(1911, 2) = 30
yearArray(1911, 3) = 42200
yearArray(1912, 0) = 0
yearArray(1912, 1) = 2
yearArray(1912, 2) = 18
yearArray(1912, 3) = 42192
yearArray(1913, 0) = 0
yearArray(1913, 1) = 2
yearArray(1913, 2) = 6
yearArray(1913, 3) = 53840
yearArray(1914, 0) = 5
yearArray(1914, 1) = 1
yearArray(1914, 2) = 26
yearArray(1914, 3) = 54568
yearArray(1915, 0) = 0
yearArray(1915, 1) = 2
yearArray(1915, 2) = 14
yearArray(1915, 3) = 46400
yearArray(1916, 0) = 0
yearArray(1916, 1) = 2
yearArray(1916, 2) = 3
yearArray(1916, 3) = 54944
yearArray(1917, 0) = 2
yearArray(1917, 1) = 1
yearArray(1917, 2) = 23
yearArray(1917, 3) = 38608
yearArray(1918, 0) = 0
yearArray(1918, 1) = 2
yearArray(1918, 2) = 11
yearArray(1918, 3) = 38320
yearArray(1919, 0) = 7
yearArray(1919, 1) = 2
yearArray(1919, 2) = 1
yearArray(1919, 3) = 18872
yearArray(1920, 0) = 0
yearArray(1920, 1) = 2
yearArray(1920, 2) = 20
yearArray(1920, 3) = 18800
yearArray(1921, 0) = 0
yearArray(1921, 1) = 2
yearArray(1921, 2) = 8
yearArray(1921, 3) = 42160
yearArray(1922, 0) = 5
yearArray(1922, 1) = 1
yearArray(1922, 2) = 28
yearArray(1922, 3) = 45656
yearArray(1923, 0) = 0
yearArray(1923, 1) = 2
yearArray(1923, 2) = 16
yearArray(1923, 3) = 27216
yearArray(1924, 0) = 0
yearArray(1924, 1) = 2
yearArray(1924, 2) = 5
yearArray(1924, 3) = 27968
yearArray(1925, 0) = 4
yearArray(1925, 1) = 1
yearArray(1925, 2) = 24
yearArray(1925, 3) = 44456
yearArray(1926, 0) = 0
yearArray(1926, 1) = 2
yearArray(1926, 2) = 13
yearArray(1926, 3) = 11104
yearArray(1927, 0) = 0
yearArray(1927, 1) = 2
yearArray(1927, 2) = 2
yearArray(1927, 3) = 38256
yearArray(1928, 0) = 2
yearArray(1928, 1) = 1
yearArray(1928, 2) = 23
yearArray(1928, 3) = 18808
yearArray(1929, 0) = 0
yearArray(1929, 1) = 2
yearArray(1929, 2) = 10
yearArray(1929, 3) = 18800
yearArray(1930, 0) = 6
yearArray(1930, 1) = 1
yearArray(1930, 2) = 30
yearArray(1930, 3) = 25776
yearArray(1931, 0) = 0
yearArray(1931, 1) = 2
yearArray(1931, 2) = 17
yearArray(1931, 3) = 54432
yearArray(1932, 0) = 0
yearArray(1932, 1) = 2
yearArray(1932, 2) = 6
yearArray(1932, 3) = 59984
yearArray(1933, 0) = 5
yearArray(1933, 1) = 1
yearArray(1933, 2) = 26
yearArray(1933, 3) = 27976
yearArray(1934, 0) = 0
yearArray(1934, 1) = 2
yearArray(1934, 2) = 14
yearArray(1934, 3) = 23248
yearArray(1935, 0) = 0
yearArray(1935, 1) = 2
yearArray(1935, 2) = 4
yearArray(1935, 3) = 11104
yearArray(1936, 0) = 3
yearArray(1936, 1) = 1
yearArray(1936, 2) = 24
yearArray(1936, 3) = 37744
yearArray(1937, 0) = 0
yearArray(1937, 1) = 2
yearArray(1937, 2) = 11
yearArray(1937, 3) = 37600
yearArray(1938, 0) = 7
yearArray(1938, 1) = 1
yearArray(1938, 2) = 31
yearArray(1938, 3) = 51560
yearArray(1939, 0) = 0
yearArray(1939, 1) = 2
yearArray(1939, 2) = 19
yearArray(1939, 3) = 51536
yearArray(1940, 0) = 0
yearArray(1940, 1) = 2
yearArray(1940, 2) = 8
yearArray(1940, 3) = 54432
yearArray(1941, 0) = 6
yearArray(1941, 1) = 1
yearArray(1941, 2) = 27
yearArray(1941, 3) = 55888
yearArray(1942, 0) = 0
yearArray(1942, 1) = 2
yearArray(1942, 2) = 15
yearArray(1942, 3) = 46416
yearArray(1943, 0) = 0
yearArray(1943, 1) = 2
yearArray(1943, 2) = 5
yearArray(1943, 3) = 22176
yearArray(1944, 0) = 4
yearArray(1944, 1) = 1
yearArray(1944, 2) = 25
yearArray(1944, 3) = 43736
yearArray(1945, 0) = 0
yearArray(1945, 1) = 2
yearArray(1945, 2) = 13
yearArray(1945, 3) = 9680
yearArray(1946, 0) = 0
yearArray(1946, 1) = 2
yearArray(1946, 2) = 2
yearArray(1946, 3) = 37584
yearArray(1947, 0) = 2
yearArray(1947, 1) = 1
yearArray(1947, 2) = 22
yearArray(1947, 3) = 51544
yearArray(1948, 0) = 0
yearArray(1948, 1) = 2
yearArray(1948, 2) = 10
yearArray(1948, 3) = 43344
yearArray(1949, 0) = 7
yearArray(1949, 1) = 1
yearArray(1949, 2) = 29
yearArray(1949, 3) = 46248
yearArray(1950, 0) = 0
yearArray(1950, 1) = 2
yearArray(1950, 2) = 17
yearArray(1950, 3) = 27808
yearArray(1951, 0) = 0
yearArray(1951, 1) = 2
yearArray(1951, 2) = 6
yearArray(1951, 3) = 46416
yearArray(1952, 0) = 5
yearArray(1952, 1) = 1
yearArray(1952, 2) = 27
yearArray(1952, 3) = 21928
yearArray(1953, 0) = 0
yearArray(1953, 1) = 2
yearArray(1953, 2) = 14
yearArray(1953, 3) = 19872
yearArray(1954, 0) = 0
yearArray(1954, 1) = 2
yearArray(1954, 2) = 3
yearArray(1954, 3) = 42416
yearArray(1955, 0) = 3
yearArray(1955, 1) = 1
yearArray(1955, 2) = 24
yearArray(1955, 3) = 21176
yearArray(1956, 0) = 0
yearArray(1956, 1) = 2
yearArray(1956, 2) = 12
yearArray(1956, 3) = 21168
yearArray(1957, 0) = 8
yearArray(1957, 1) = 1
yearArray(1957, 2) = 31
yearArray(1957, 3) = 43344
yearArray(1958, 0) = 0
yearArray(1958, 1) = 2
yearArray(1958, 2) = 18
yearArray(1958, 3) = 59728
yearArray(1959, 0) = 0
yearArray(1959, 1) = 2
yearArray(1959, 2) = 8
yearArray(1959, 3) = 27296
yearArray(1960, 0) = 6
yearArray(1960, 1) = 1
yearArray(1960, 2) = 28
yearArray(1960, 3) = 44368
yearArray(1961, 0) = 0
yearArray(1961, 1) = 2
yearArray(1961, 2) = 15
yearArray(1961, 3) = 43856
yearArray(1962, 0) = 0
yearArray(1962, 1) = 2
yearArray(1962, 2) = 5
yearArray(1962, 3) = 19296
yearArray(1963, 0) = 4
yearArray(1963, 1) = 1
yearArray(1963, 2) = 25
yearArray(1963, 3) = 42352
yearArray(1964, 0) = 0
yearArray(1964, 1) = 2
yearArray(1964, 2) = 13
yearArray(1964, 3) = 42352
yearArray(1965, 0) = 0
yearArray(1965, 1) = 2
yearArray(1965, 2) = 2
yearArray(1965, 3) = 21088
yearArray(1966, 0) = 3
yearArray(1966, 1) = 1
yearArray(1966, 2) = 21
yearArray(1966, 3) = 59696
yearArray(1967, 0) = 0
yearArray(1967, 1) = 2
yearArray(1967, 2) = 9
yearArray(1967, 3) = 55632
yearArray(1968, 0) = 7
yearArray(1968, 1) = 1
yearArray(1968, 2) = 30
yearArray(1968, 3) = 23208
yearArray(1969, 0) = 0
yearArray(1969, 1) = 2
yearArray(1969, 2) = 17
yearArray(1969, 3) = 22176
yearArray(1970, 0) = 0
yearArray(1970, 1) = 2
yearArray(1970, 2) = 6
yearArray(1970, 3) = 38608
yearArray(1971, 0) = 5
yearArray(1971, 1) = 1
yearArray(1971, 2) = 27
yearArray(1971, 3) = 19176
yearArray(1972, 0) = 0
yearArray(1972, 1) = 2
yearArray(1972, 2) = 15
yearArray(1972, 3) = 19152
yearArray(1973, 0) = 0
yearArray(1973, 1) = 2
yearArray(1973, 2) = 3
yearArray(1973, 3) = 42192
yearArray(1974, 0) = 4
yearArray(1974, 1) = 1
yearArray(1974, 2) = 23
yearArray(1974, 3) = 53864
yearArray(1975, 0) = 0
yearArray(1975, 1) = 2
yearArray(1975, 2) = 11
yearArray(1975, 3) = 53840
yearArray(1976, 0) = 8
yearArray(1976, 1) = 1
yearArray(1976, 2) = 31
yearArray(1976, 3) = 54568
yearArray(1977, 0) = 0
yearArray(1977, 1) = 2
yearArray(1977, 2) = 18
yearArray(1977, 3) = 46400
yearArray(1978, 0) = 0
yearArray(1978, 1) = 2
yearArray(1978, 2) = 7
yearArray(1978, 3) = 46752
yearArray(1979, 0) = 6
yearArray(1979, 1) = 1
yearArray(1979, 2) = 28
yearArray(1979, 3) = 38608
yearArray(1980, 0) = 0
yearArray(1980, 1) = 2
yearArray(1980, 2) = 16
yearArray(1980, 3) = 38320
yearArray(1981, 0) = 0
yearArray(1981, 1) = 2
yearArray(1981, 2) = 5
yearArray(1981, 3) = 18864
yearArray(1982, 0) = 4
yearArray(1982, 1) = 1
yearArray(1982, 2) = 25
yearArray(1982, 3) = 42168
yearArray(1983, 0) = 0
yearArray(1983, 1) = 2
yearArray(1983, 2) = 13
yearArray(1983, 3) = 42160
yearArray(1984, 0) = 10
yearArray(1984, 1) = 2
yearArray(1984, 2) = 2
yearArray(1984, 3) = 45656
yearArray(1985, 0) = 0
yearArray(1985, 1) = 2
yearArray(1985, 2) = 20
yearArray(1985, 3) = 27216
yearArray(1986, 0) = 0
yearArray(1986, 1) = 2
yearArray(1986, 2) = 9
yearArray(1986, 3) = 27968
yearArray(1987, 0) = 6
yearArray(1987, 1) = 1
yearArray(1987, 2) = 29
yearArray(1987, 3) = 44448
yearArray(1988, 0) = 0
yearArray(1988, 1) = 2
yearArray(1988, 2) = 17
yearArray(1988, 3) = 43872
yearArray(1989, 0) = 0
yearArray(1989, 1) = 2
yearArray(1989, 2) = 6
yearArray(1989, 3) = 38256
yearArray(1990, 0) = 5
yearArray(1990, 1) = 1
yearArray(1990, 2) = 27
yearArray(1990, 3) = 18808
yearArray(1991, 0) = 0
yearArray(1991, 1) = 2
yearArray(1991, 2) = 15
yearArray(1991, 3) = 18800
yearArray(1992, 0) = 0
yearArray(1992, 1) = 2
yearArray(1992, 2) = 4
yearArray(1992, 3) = 25776
yearArray(1993, 0) = 3
yearArray(1993, 1) = 1
yearArray(1993, 2) = 23
yearArray(1993, 3) = 27216
yearArray(1994, 0) = 0
yearArray(1994, 1) = 2
yearArray(1994, 2) = 10
yearArray(1994, 3) = 59984
yearArray(1995, 0) = 8
yearArray(1995, 1) = 1
yearArray(1995, 2) = 31
yearArray(1995, 3) = 27432
yearArray(1996, 0) = 0
yearArray(1996, 1) = 2
yearArray(1996, 2) = 19
yearArray(1996, 3) = 23232
yearArray(1997, 0) = 0
yearArray(1997, 1) = 2
yearArray(1997, 2) = 7
yearArray(1997, 3) = 43872
yearArray(1998, 0) = 5
yearArray(1998, 1) = 1
yearArray(1998, 2) = 28
yearArray(1998, 3) = 37736
yearArray(1999, 0) = 0
yearArray(1999, 1) = 2
yearArray(1999, 2) = 16
yearArray(1999, 3) = 37600
yearArray(2000, 0) = 0
yearArray(2000, 1) = 2
yearArray(2000, 2) = 5
yearArray(2000, 3) = 51552
yearArray(2001, 0) = 4
yearArray(2001, 1) = 1
yearArray(2001, 2) = 24
yearArray(2001, 3) = 54440
yearArray(2002, 0) = 0
yearArray(2002, 1) = 2
yearArray(2002, 2) = 12
yearArray(2002, 3) = 54432
yearArray(2003, 0) = 0
yearArray(2003, 1) = 2
yearArray(2003, 2) = 1
yearArray(2003, 3) = 55888
yearArray(2004, 0) = 2
yearArray(2004, 1) = 1
yearArray(2004, 2) = 22
yearArray(2004, 3) = 23208
yearArray(2005, 0) = 0
yearArray(2005, 1) = 2
yearArray(2005, 2) = 9
yearArray(2005, 3) = 22176
yearArray(2006, 0) = 7
yearArray(2006, 1) = 1
yearArray(2006, 2) = 29
yearArray(2006, 3) = 43736
yearArray(2007, 0) = 0
yearArray(2007, 1) = 2
yearArray(2007, 2) = 18
yearArray(2007, 3) = 9680
yearArray(2008, 0) = 0
yearArray(2008, 1) = 2
yearArray(2008, 2) = 7
yearArray(2008, 3) = 37584
yearArray(2009, 0) = 5
yearArray(2009, 1) = 1
yearArray(2009, 2) = 26
yearArray(2009, 3) = 51544
yearArray(2010, 0) = 0
yearArray(2010, 1) = 2
yearArray(2010, 2) = 14
yearArray(2010, 3) = 43344
yearArray(2011, 0) = 0
yearArray(2011, 1) = 2
yearArray(2011, 2) = 3
yearArray(2011, 3) = 46240
yearArray(2012, 0) = 4
yearArray(2012, 1) = 1
yearArray(2012, 2) = 23
yearArray(2012, 3) = 46416
yearArray(2013, 0) = 0
yearArray(2013, 1) = 2
yearArray(2013, 2) = 10
yearArray(2013, 3) = 44368
yearArray(2014, 0) = 9
yearArray(2014, 1) = 1
yearArray(2014, 2) = 31
yearArray(2014, 3) = 21928
yearArray(2015, 0) = 0
yearArray(2015, 1) = 2
yearArray(2015, 2) = 19
yearArray(2015, 3) = 19360
yearArray(2016, 0) = 0
yearArray(2016, 1) = 2
yearArray(2016, 2) = 8
yearArray(2016, 3) = 42416
yearArray(2017, 0) = 6
yearArray(2017, 1) = 1
yearArray(2017, 2) = 28
yearArray(2017, 3) = 21176
yearArray(2018, 0) = 0
yearArray(2018, 1) = 2
yearArray(2018, 2) = 16
yearArray(2018, 3) = 21168
yearArray(2019, 0) = 0
yearArray(2019, 1) = 2
yearArray(2019, 2) = 5
yearArray(2019, 3) = 43312
yearArray(2020, 0) = 4
yearArray(2020, 1) = 1
yearArray(2020, 2) = 25
yearArray(2020, 3) = 29864
yearArray(2021, 0) = 0
yearArray(2021, 1) = 2
yearArray(2021, 2) = 12
yearArray(2021, 3) = 27296
yearArray(2022, 0) = 0
yearArray(2022, 1) = 2
yearArray(2022, 2) = 1
yearArray(2022, 3) = 44368
yearArray(2023, 0) = 2
yearArray(2023, 1) = 1
yearArray(2023, 2) = 22
yearArray(2023, 3) = 19880
yearArray(2024, 0) = 0
yearArray(2024, 1) = 2
yearArray(2024, 2) = 10
yearArray(2024, 3) = 19296
yearArray(2025, 0) = 6
yearArray(2025, 1) = 1
yearArray(2025, 2) = 29
yearArray(2025, 3) = 42352
yearArray(2026, 0) = 0
yearArray(2026, 1) = 2
yearArray(2026, 2) = 17
yearArray(2026, 3) = 42208
yearArray(2027, 0) = 0
yearArray(2027, 1) = 2
yearArray(2027, 2) = 6
yearArray(2027, 3) = 53856
yearArray(2028, 0) = 5
yearArray(2028, 1) = 1
yearArray(2028, 2) = 26
yearArray(2028, 3) = 59696
yearArray(2029, 0) = 0
yearArray(2029, 1) = 2
yearArray(2029, 2) = 13
yearArray(2029, 3) = 54576
yearArray(2030, 0) = 0
yearArray(2030, 1) = 2
yearArray(2030, 2) = 3
yearArray(2030, 3) = 23200
yearArray(2031, 0) = 3
yearArray(2031, 1) = 1
yearArray(2031, 2) = 23
yearArray(2031, 3) = 27472
yearArray(2032, 0) = 0
yearArray(2032, 1) = 2
yearArray(2032, 2) = 11
yearArray(2032, 3) = 38608
yearArray(2033, 0) = 11
yearArray(2033, 1) = 1
yearArray(2033, 2) = 31
yearArray(2033, 3) = 19176
yearArray(2034, 0) = 0
yearArray(2034, 1) = 2
yearArray(2034, 2) = 19
yearArray(2034, 3) = 19152
yearArray(2035, 0) = 0
yearArray(2035, 1) = 2
yearArray(2035, 2) = 8
yearArray(2035, 3) = 42192
yearArray(2036, 0) = 6
yearArray(2036, 1) = 1
yearArray(2036, 2) = 28
yearArray(2036, 3) = 53848
yearArray(2037, 0) = 0
yearArray(2037, 1) = 2
yearArray(2037, 2) = 15
yearArray(2037, 3) = 53840
yearArray(2038, 0) = 0
yearArray(2038, 1) = 2
yearArray(2038, 2) = 4
yearArray(2038, 3) = 54560
yearArray(2039, 0) = 5
yearArray(2039, 1) = 1
yearArray(2039, 2) = 24
yearArray(2039, 3) = 55968
yearArray(2040, 0) = 0
yearArray(2040, 1) = 2
yearArray(2040, 2) = 12
yearArray(2040, 3) = 46496
yearArray(2041, 0) = 0
yearArray(2041, 1) = 2
yearArray(2041, 2) = 1
yearArray(2041, 3) = 22224
yearArray(2042, 0) = 2
yearArray(2042, 1) = 1
yearArray(2042, 2) = 22
yearArray(2042, 3) = 19160
yearArray(2043, 0) = 0
yearArray(2043, 1) = 2
yearArray(2043, 2) = 10
yearArray(2043, 3) = 18864
yearArray(2044, 0) = 7
yearArray(2044, 1) = 1
yearArray(2044, 2) = 30
yearArray(2044, 3) = 42168
yearArray(2045, 0) = 0
yearArray(2045, 1) = 2
yearArray(2045, 2) = 17
yearArray(2045, 3) = 42160
yearArray(2046, 0) = 0
yearArray(2046, 1) = 2
yearArray(2046, 2) = 6
yearArray(2046, 3) = 43600
yearArray(2047, 0) = 5
yearArray(2047, 1) = 1
yearArray(2047, 2) = 26
yearArray(2047, 3) = 46376
yearArray(2048, 0) = 0
yearArray(2048, 1) = 2
yearArray(2048, 2) = 14
yearArray(2048, 3) = 27936
yearArray(2049, 0) = 0
yearArray(2049, 1) = 2
yearArray(2049, 2) = 2
yearArray(2049, 3) = 44448
yearArray(2050, 0) = 3
yearArray(2050, 1) = 1
yearArray(2050, 2) = 23
yearArray(2050, 3) = 21936




GetInfoYear = yearArray(LunarYear, Index)



End Function



Function GergIsleap(y As Integer) As Integer
    '()
    'If((((y) Mod 4) <> 0), 0, (If((((y) Mod 100) <> 0), 1, (If((((y) Mod 400) <> 0), 0, 1)))))
    Dim tempInt As Integer
    
    tempInt = 0
    
    If (y Mod 4 <> 0) Then
        tempInt = 0
    Else
        If (y Mod 100 <> 0) Then
            tempInt = 1
        Else
            If (y Mod 400 <> 0) Then
                tempInt = 0
            Else
                 tempInt = 1
            End If
        End If
     End If
    
    GergIsleap = tempInt
End Function

Function GetLunarYear(nSYear As Integer, nSMonth As Integer, nSDate As Integer) As Integer

    Dim tnLYear As Integer
    Dim tnLMonth As Integer
    Dim tnLDate As Integer
    
    Call GregorianToLunar(nSYear, nSMonth, nSDate, tnLYear, tnLMonth, tnLDate)

GetLunarYear = tnLYear + 2698

End Function

Function GetLunarMonth(nSYear As Integer, nSMonth As Integer, nSDate As Integer) As Integer

    Dim tnLYear As Integer
    Dim tnLMonth As Integer
    Dim tnLDate As Integer
    
    Call GregorianToLunar(nSYear, nSMonth, nSDate, tnLYear, tnLMonth, tnLDate)
    
GetLunarMonth = tnLMonth

End Function

Function GetLunarDay(nSYear As Integer, nSMonth As Integer, nSDate As Integer) As Integer

    Dim tnLYear As Integer
    Dim tnLMonth As Integer
    Dim tnLDate As Integer
    
    Call GregorianToLunar(nSYear, nSMonth, nSDate, tnLYear, tnLMonth, tnLDate)

GetLunarDay = tnLDate

End Function


'
' GregorianToLunar calculates lunar calendar info for the given gregorian year, month, date.
' The input date should be validated before calling this method.
'
Public Sub GregorianToLunar(nSYear As Integer, nSMonth As Integer, nSDate As Integer, ByRef nLYear As Integer, ByRef nLMonth As Integer, ByRef nLDate As Integer)
    '    unsigned int nLYear, nLMonth, nLDate;    // lunar ymd
    Dim nSolarDay As Integer
    ' day # in solar year
    Dim nLunarDay As Integer
    ' day # in lunar year
    Dim fLeap As Integer
    ' is it a solar leap year?
    Dim LDpM As Long
    ' lunar days/month bitfield
    Dim mask As Long
    ' mask for extracting bits
    Dim nDays As Integer
    ' # days this lunar month
    Dim nJan1Month As Integer, nJan1Date As Integer
    
    
    Const leapMonth As Integer = 0
    Const Jan1Month As Integer = 1
    Const Jan1Date As Integer = 2
    Const nDaysPerMonth As Integer = 3

    
    ' # of days so far in the solar year
    Dim DaysToMonth365() 'As Integer
    DaysToMonth365 = Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334)

    Dim DaysToMonth366() 'As Integer
    DaysToMonth366 = Array(0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335)

    ' calc the solar day of year
    fLeap = GergIsleap(nSYear)
    'nSolarDay = If((fLeap = 1), DaysToMonth366(nSMonth - 1), DaysToMonth365(nSMonth - 1))
    
    If fLeap = 1 Then
        nSolarDay = DaysToMonth366(nSMonth - 1)
    Else
        nSolarDay = DaysToMonth365(nSMonth - 1)
    End If
    
    'nSolarDay += nSDate
    nSolarDay = nSolarDay + nSDate

    ' init lunar year info
    nLunarDay = nSolarDay
    nLYear = nSYear


    nJan1Month = GetInfoYear(nLYear, Jan1Month)
    nJan1Date = GetInfoYear(nLYear, Jan1Date)
    
    ' check if this solar date is actually part of the previous
    ' lunar year
    If (nSMonth < nJan1Month) Or (nSMonth = nJan1Month And nSDate < nJan1Date) Then
        ' the corresponding lunar day is actually part of the previous
        ' lunar year
        'nLYear -= 1
        nLYear = nLYear + 1
       
        ' update the new start of year
        nJan1Month = GetInfoYear(nLYear, Jan1Month)
        nJan1Date = GetInfoYear(nLYear, Jan1Date)
    End If

    ' check if this solar date is actually part of the previous
    ' lunar year
    If (nSMonth < nJan1Month) Or (nSMonth = nJan1Month And nSDate < nJan1Date) Then
        ' the corresponding lunar day is actually part of the previous
        ' lunar year
        'nLYear -= 1
        nLYear = nLYear - 1

        ' add a solar year to the lunar day #
        'nLunarDay += (If((GergIsleap(nLYear) = 1), 366, 365))
        
        If (GergIsleap(nLYear) = 1) Then
            nLunarDay = nLunarDay + 366
        Else
            nLunarDay = nLunarDay + 365
        End If
        

        ' update the new start of year
        nJan1Month = GetInfoYear(nLYear, Jan1Month)
        nJan1Date = GetInfoYear(nLYear, Jan1Date)
    End If


    ' convert solar day into lunar day.
    ' subtract off the beginning part of the solar year which is not
    ' part of the lunar year.  since this part is always in Jan or Feb,
    ' we don't need to handle Leap Year (LY only affects March
    ' and later).
    'nLunarDay -= DaysToMonth365(nJan1Month - 1)
    nLunarDay = nLunarDay - DaysToMonth365(nJan1Month - 1)
  
    'nLunarDay -= (nJan1Date - 1)
    nLunarDay = nLunarDay - (nJan1Date - 1)
    


    ' convert the lunar day into a lunar month/date
    mask = 32768 '&H8000 '
    LDpM = GetInfoYear(nLYear, nDaysPerMonth)
        
    'nDays = If(((LDpM And mask) <> 0), 30, 29)
    
    If ((LDpM And mask) <> 0) Then
        nDays = 30
    Else
        nDays = 29
    End If
    
    
    nLMonth = 1
    Do While nLunarDay > nDays
        'nLunarDay -= nDays
        nLunarDay = nLunarDay - nDays
        
        'nLMonth += 1
        nLMonth = nLMonth + 1
        'mask >>= 1
        'x = x >> y
         mask = shr(mask, 1)
        
        'nDays = If(((LDpM And mask) <> 0), 30, 29)
        If ((LDpM And mask) <> 0) Then
            nDays = 30
        Else
            nDays = 29
        End If
    
    Loop
    
    nLDate = nLunarDay
    
    If IsLeapYear(nLYear) Then
     
        Dim currentLeapMonth  As Integer
        currentLeapMonth = GetLeapMonth(nLYear)
        
        If (nLMonth >= currentLeapMonth) Then
            nLMonth = nLMonth - 1
        End If
     
     End If

    
End Sub

Public Function shr(ByVal Value As Long, ByVal Shift As Byte) As Long
    Dim i As Byte
    shr = Value
    If Shift > 0 Then
        shr = Int(shr / (2 ^ Shift))
    End If
End Function



' Checks whether a given month in the specified era is a leap month. This method returns true if
' month is a leap month, or false if not.
'
Public Function IsLeapMonth(year As Integer, month As Integer) As Boolean
    Const leapMonth As Integer = 0
    Dim m As Integer
    m = GetInfoYear(year, leapMonth)
    
    IsLeapMonth = ((m <> 0) And (month = (m + 1)))
End Function

' Returns  the leap month in a calendar year of the specified era. This method returns 0
' if this this year is not a leap year.
'
Public Function GetLeapMonth(year As Integer) As Integer
     Const leapMonth As Integer = 0
    Dim month As Integer
    month = GetInfoYear(year, leapMonth)
    
    If month > 0 Then
        GetLeapMonth = (month + 1)
    Else
        GetLeapMonth = 0
    End If
    'Return 0
End Function

Function InternalIsLeapYear(year As Integer) As Boolean
     Const leapMonth As Integer = 0
    InternalIsLeapYear = (GetInfoYear(year, leapMonth) <> 0)
End Function

' Checks whether a given year in the specified era is a leap year. This method returns true if
' year is a leap year, or false if not.'

Public Function IsLeapYear(year As Integer) As Boolean

    IsLeapYear = InternalIsLeapYear(year)
    
End Function
