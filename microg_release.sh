#!/bin/bash

# Main function to fetch release data, process it, and export the markdown content
fetch_and_export_release_data() {
    # Fetch the latest release data from GitHub API
    local release_data
    release_data=$(curl -s https://api.github.com/repos/ReVanced/GmsCore/releases/latest)

    # Check if the API call was successful
    if [ -z "$release_data" ] || [ "$(echo "$release_data" | jq -r '.message')" == "Not Found" ]; then
        echo "Error: Unable to fetch release data."
        exit 1
    fi

    # Extract the release version and download URLs
    local release_version universal_url huawei_url
    release_version=$(echo "$release_data" | jq -r '.tag_name')
    universal_url=$(echo "$release_data" | jq -r '.assets[] | select(.name | contains("signed.apk") and contains("hw") | not) | .browser_download_url')
    huawei_url=$(echo "$release_data" | jq -r '.assets[] | select(.name | contains("hw-signed.apk")) | .browser_download_url')

    # Generate the markdown content
    GMS_CONTENT="## Install [Revanced GmsCore](https://github.com/ReVanced/GmsCore/releases/latest) for Revanced Google Apps
| Android Device | Download Link                      |
| ---            | ---                                |
| Universal      | [$release_version]($universal_url) |
| Huawei         | [$release_version]($huawei_url)    |"

    # Export the GMS_CONTENT variable
    export GMS_CONTENT
}

# Execute the function
fetch_and_export_release_data
