#$period = [timespan]::FromSeconds(45)
#$lastRunTime = [DateTime]::MinValue
#
#Get-EventLog Security -Newest 1 -InstanceId 4634
#Get-EventLog Security -Newest 1 -InstanceId 4624
#InstanceID
#Loggedoff 4634
#logged on 4624

$RunAtSecond = [Int] 30 
$SecondsInMinute = 60
$jsonObj = @{computerName=$env:USERNAME;token=$env:TOKEN; isAvailable= 1} | ConvertTo-Json
$HOMERUN = "https://homeruncyber.herokuapp.com/info/updatestatus"
while (1)
{
    # If the next period isn't here yet, sleep so we don't consume CPU
    while (((Get-Date).Second % $SecondsInMinute ) -ne $RunAtSecond) { 
        Start-Sleep -Milliseconds 500
    }
    
    #$logOffDate = Get-WinEvent -ProviderName Microsoft-Windows-Winlogon -MaxEvents 10 | Where-Object {$_.ID -eq "811"} | Select-Object -First 1 -Property TimeCreated
    $lastRunTime = Get-Date
    # Call your batch file here
    #echo $logOffDate
    echo $lastRunTime
    Invoke-RestMethod -Uri $HOMERUN -Method Post -Body $jsonObj -ContentType 'application/json'
    Start-Sleep -Seconds 1
}