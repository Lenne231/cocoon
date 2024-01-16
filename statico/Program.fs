open Html

let site = html [] [
  head [] []
  body [] [
    h1 [] [ str "My website" ]
    hr []
    a [ _href "/" ] [str "Home" ]
    a [ _href "/about" ] [str "About" ]
    a [ _href "/impressum" ] [str "Impressum" ]
    hr []
    routeIndex [
      h2 [] [ str "Home" ]
      p [] [
        str "This is the welcome text!"
      ]
    ]
    routeSegment "about" [
      h2 [] [ str "About" ]
    ]
    routeSegment "impressum" [
      h2 [] [ str "Impressum" ]
    ]
  ]
]

let distPath = System.IO.Path.Combine(__SOURCE_DIRECTORY__, "dist")
System.IO.Directory.Delete(distPath, true)

render distPath site


printfn "Done!"
