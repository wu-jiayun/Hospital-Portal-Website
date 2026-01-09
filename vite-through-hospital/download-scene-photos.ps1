$ErrorActionPreference = 'Stop'

# Prefer TLS 1.2 for HTTPS
try {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
} catch {
  # ignore
}

$destDir = Join-Path $PSScriptRoot 'public\images\scene'
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

$items = @(
  # Henan / Zhengzhou hospitals (prefer Chinese signage in entrances/gates)
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20220301%20Henan%20Provincial%20People%27s%20Hospital.jpg'; Out = 'hero.jpg' },
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20220301%20South%20Gate%20of%20Henan%20Provincial%20People%27s%20Hospital.jpg'; Out = 'entrance.jpg' },
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20201029%20Inpatient%20Department%20%28West%20Building%29%20of%20Henan%20Provincial%20People%27s%20Hospital.jpg'; Out = 'exterior.jpg' },

  # Henan Provincial TCM Hospital (Zhengzhou)
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20221003%20Emergency%20center%20at%20Henan%20TCM%20Hospital.jpg'; Out = 'emergency.jpg' },
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20210705%20Henan%20Provincial%20TCM%20Hospital.jpg'; Out = 'lobby-1.jpg' },
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20210705%20Henan%20Provincial%20TCM%20Hospital%2002.jpg'; Out = 'lobby-2.jpg' },

  # Zhengzhou city hospitals
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20221014%20Zhengzhou%20No.%201%20People%27s%20Hospital.jpg'; Out = 'reception.jpg' },
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20210831%20Zhengzhou%20No.3%20People%27s%20Hospital.jpg'; Out = 'waiting-room.jpg' },
  @{ Url = 'https://commons.wikimedia.org/wiki/Special:FilePath/20240920%20Zhengzhou%20No.%203%20People%27s%20Hospital.jpg'; Out = 'corridor.jpg' }
)

foreach ($it in $items) {
  $dest = Join-Path $destDir $it.Out
  Write-Host ("Downloading: {0} -> {1}" -f $it.Url, $dest)
  $ok = $false
  for ($i = 1; $i -le 3; $i++) {
    try {
      Start-BitsTransfer -Source $it.Url -Destination $dest -ErrorAction Stop
      $ok = $true
      break
    } catch {
      Write-Host ("Retry {0}/3 failed: {1}" -f $i, $_.Exception.Message)
      Start-Sleep -Seconds 2
    }
  }
  if (-not $ok) {
    throw "Failed to download: $($it.Url)"
  }
}

Write-Host "Done. Files saved to: $destDir"
