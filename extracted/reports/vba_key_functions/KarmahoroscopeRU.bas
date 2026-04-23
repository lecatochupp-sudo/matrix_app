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