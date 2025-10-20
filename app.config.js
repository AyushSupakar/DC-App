module.exports = {
  expo: {
    name: "DC-App",
    slug: "DC-App",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "dcapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      HYGRAPH_URL: "https://ap-south-1.cdn.hygraph.com/content/cm8k55xjp0c8p07uoweby2stp/master",
      HYGRAPH_TOKEN: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NDI4ODcxMzMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtOGs1NXhqcDBjOHAwN3Vvd2VieTJzdHAvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJkNTQ5NmVkOS01ODBhLTRkNDEtYTMxZi04MmQ5MzFhZmU5N2UiLCJqdGkiOiJjbThvNXp5cTUwYWsyMDdwbGZ4MWUycHNoIn0.tJ7I_D8uXrvwsG7twb3hG0oGlmUrZ87TD-D7s60dKbRKbs5U-j7sg0VAPAPWytXcvz2UCAgIX3IkpghajeI9OP7t9T6pbgPoKtA8bbX2Hye4kdsgo_MOxjiu_CpxOtHjUNouchMzcVUif95twvSEEAnrSbbpslRwCV8i99-twD-9lPXjA-G0MRGrqLOsavhlPYRKXdcN3andGpKHfA2N81409nHtAQ0MWr9j2kBdWge7DzuNHu9AuOCY7fDqcqyIvuG_rimO6mWdz6nj4D0Q1fYbRaKUowzqsMs75cooytNe6b-gDsP4qP-7dZcuOkbGRWg_N_AxiVHa34upQTTwJQ0uBkBYi2tXdh9TIbMdqcBJrjaHcNEFrEXDR5aTQWwAfxgWkJwGsKo2KM7W6KTOvlGvZghTg8VTGZw3kJBiwbpQ8q4UKPfW6sn1icwqvBIrNk9Hp_dY3zfIibjk8O_ppjt1_2oIT0Ve9LAC3QgWa9G89ZknwnnovitfyUsQmVrrzIPfeSIlFQ1btMAh-UKud1G6dOxe4rwA5mJZ-ThC5WQYR7qctreOMCd3CxKoFrIW7d97A7MBrk_v6W1dXt58NROD2PxW8FuYjDdp2I_Hr9F4fwKFF5_gfbIf5fMlbeyiHupWhmN7w4b-iJAd9ZNNJzAZQ7TYt9-M_K9JBT0k7HE"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundImage: "./assets/images/adaptive-icon.png",
        monochromeImage: "./assets/images/adaptive-icon.png"
      }
    }
  }
};