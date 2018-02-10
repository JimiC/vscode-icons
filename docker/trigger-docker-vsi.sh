#!bin/bash/
RED='\033[1;31m'
NC='\033[0m' # No Color

OWNER='vscode-icons'
REPO='docker'
TAG_TEXT='latest'

usage()
{
  echo -e "Triggers the 'vsi' docker image build."
  echo -e "Usage: $0 [options]"
  echo -e "    -h, --help\t\t\tDisplay help"
  echo -e "\t--token [ACCESS_TOKEN]\tTravis access token"
  echo -e " \t--tag [TAG]\t\tBuild tag"
  echo ""
}

parse()
{
  if [[ -z $1 ]]; then
    usage
    exit
  fi
  while [[ -n $1 ]]; do
      PARAM=`echo $1 | awk -F= '{print $1}'`
      VALUE=`echo $1 | awk -F= '{print $2}'`
      if [[ -z $VALUE ]]; then
        VALUE=$2
        if [[ -z $VALUE ]] || [[ $VALUE == -* ]]; then
          echo -e "${RED}ERROR: Missing value for parameter \"$PARAM\"${NC}"
          exit 1
        fi
        shift
      fi
      case $PARAM in
          -h | --help)
              usage
              exit
              ;;
          --token)
              TRAVIS_TOKEN=$VALUE
              ;;
          --tag)
              TRAVIS_TAG=$VALUE
              ;;
          *)
              echo -e "${RED}ERROR: Unknown parameter \"$PARAM\"${NC}"
              exit 1
              ;;
      esac
      shift
  done
}

parse $*

if [ $TRAVIS_TAG ]; then
    ENV_TAG=',"TAG":"'$TRAVIS_TAG'"';
    TAG_TEXT="$TRAVIS_TAG";
fi

BODY='{"request":{"message":"Triggering build of vsi:'$TAG_TEXT'","branch": "master","config":{"env":{"global":{"TARGET":"vsi"'$ENV_TAG'}}}}}'
curl -s -X POST \
   -H "Content-Type: application/json" \
   -H "Accept: application/json" \
   -H "Travis-API-Version: 3" \
   -H "Authorization: token $TRAVIS_TOKEN" \
   -d "$BODY" \
   https://api.travis-ci.org/repo/$OWNER%2F$REPO/requests
