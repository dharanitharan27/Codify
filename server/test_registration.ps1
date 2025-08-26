try {
    $body = @{
        username = "testuser4"
        email = "test4@example.com"
        password = "testpassword123"
        phone = "1234567890"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:5050/api/v1/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body
    Write-Host "Success:"
    Write-Host $response.Content
} catch {
    Write-Host "Error:"
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host $reader.ReadToEnd()
    }
}
