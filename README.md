# Release Readiness Dashboard
Dashboards for tracking [Release Statuses of Mozillian Awesomeness](https://release-dash.paas.allizom.org).<br>
More awesome *(and possibly unstable)* new features on [the staging site](http://release-dash.williecheong.com).<br>
Change logs, progress updates and latest developments on [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0ApNDjYXWm5JndDFwLWVlM1BPR3dBdjE1ZVdfWlBwR1E&usp=sharing).

## Features
#### Running with the Train
- Checks for new cycle and updates mappings if current cycle not in database.
- Automatically executed when landing page or version pages are accessed.
- Manually execute through `http://release-dash.../admin/update_cycle`
- External dependencies: [CURRENT_CYCLE](https://wiki.mozilla.org/Template:CURRENT_CYCLE), [CENTRAL_VERSION](https://wiki.mozilla.org/Template:CENTRAL_VERSION)

#### Groups of Queries
- **Groups**:
    - Found on version pages to represent individual release readiness metrics.
    - Accessed through `http://release-dash.../for/[product_tag]/[version_tag]`
    - Every group is visualized on the dashboard as a plot, a current value, or both.
    - Each plot line or current value in a group corresponds to a query in that group.
    - *Custom groups* only apply to a single version of a product.
    - *Default groups* apply across all versions of a product.     
- **Queries**:
    - Queries may reference historic data. i.e. run same query on older version.
    - Bugzilla URLs can be specified to allow direct BZ access from the dashboard. 
    - Soft tags must be used in a Bugzilla URL if the query belongs to a *default group*.
    - For queries in default groups, soft tags are neccessary to adapt to version pages.
    - For queries in custom groups, the use of soft tags are optional.
    - Soft tags are recommended for specifying time ranges in Qb queries.
    - Soft tags references
        - `<version_tag>` : The version number. e.g. 29, 1_4
        - `<version_tag:.>` For B2G, replaces default `_` with `.`  
        - `<version_tag:->` For B2G, replaces default `_` with `-` 
        - `<version_tag-[1-9]>` Relatively prior version e.g. `<version_tag-1>` = 28
        - `<version_tag+[1-9]>` Relatively future version e.g. `<version_tag+1>` = 30
        - `<version_title>` : The version's readable name. e.g. Firefox 29 
        - `<version_title:.>` For B2G, replaces default `_` with `.`  
        - `<version_title:->` For B2G, replaces default `_` with `-` 
        - `<birthday>` :  Date when the version first entered Central (ms since epoch)
        - `<timestamp>` : Date when the version will ship into the next channel (ms since epoch)

        
- External dependencies: 
    - [Elasticsearch private cluster](https://github.com/klahnakoski/qb)
    - [Elasticsearch public cluster](https://github.com/klahnakoski/qb)

#### Administration
- Access to login panel through `http://release-dash.../admin`
- Login through Persona using an email address found on the white-list.
- Logging in grants administration privileges to `INSERT` and `DELETE` groups.
- Clarification: Logging in does **not** enable any user-specific views. 
- External dependencies: [Persona service](https://developer.mozilla.org/en-US/Persona)

#### Rules
- Each rule is written in Javascript and applies uniquely to a group.
- A function that is called after loading all queries in a group.
- Returns status color `green`, `yellow` or `red` for display.
- Click the tachometer icon on any group for instructions.

#### Qb Queries
- Access to Qb query builder on `http://release-dash.../admin/easy_qb`
- Paste a Bugzilla URL search query into the field and get it in Qb format
- External dependencies: [Bugzilla search](https://bugzilla.mozilla.org/query.cgi)
- Considerations when using the Bugzilla Advanced Search interface:
    - Try to decompose compound searches like "?,+" into separate searches
    - Delimit terms with commas `,` if compound search cannot be decomposed
    - Comparison fields that work well:
        - is equal to
        - is not equal to
        - is equal to any of the strings
        - contains the string (exact case)
        - is less than
        - is less than or equal to
        - is greater than
        - is greater than or equal to
        - is empty
        - is not empty
    - The following fields are *case insensitive on Bugzilla*
    - But Elasticsearch is unable to ignore casing in its searches
    - Searches with these comparisons will match *only when case is the same*
        - contains the string
        - does not contain the string
        - contains any of the strings
        - contains all of the strings
        - contains none of the strings
        - contains any of the words
        - contains all of the words
        - contains none of the words
    - Untested comparison fields (best to avoid):
        - matches regular expression
        - does not match regular expression
        - changed before
        - changed after
        - changed from
        - changed to
        - changed by
        - matches
        - does not match


## Deployment        
#### Requirements
- Standard Web Stack: Apache, MySQL, PHP 5.3 and above
- For deployment on local machine, try LAMP, [MAMP](http://www.mamp.info/en/downloads/) or [WAMP](http://www.wampserver.com/en/). 

#### Configuration
- Define *production*, *staging* and *development* environments in `/index.php`
- Database credentials for *development* in `/application/config/database.php`
- Landing page (base_url) for *development* in `/application/config/config.php`
- Configuration for other environments in `/application/config/[environment]/______.php`
- If neccessary, modify white-listed dashboard administrators in `/assets/sql/schema.sql`

#### Instructions
1. Clone the repository into the web directory
2. Set up a new MySQL database service on the machine
3. Define database credentials as specified in Configuration above
4. Load the database schema and initial data from `/assets/sql/schema.sql`
5. Done: RRDashboard is now live.


## Testing
To be continued


## Troubleshoot
To be continued<br>

Reach out to [Willie Cheong](http://williecheong.com) for undocumented problems.


## References
- [CodeIgniter](http://ellislab.com/codeigniter): Server side PHP framework
- [CI RestServer](https://github.com/philsturgeon/codeigniter-restserver): Support for REST APIs on CodeIgniter
- [Qb](https://github.com/klahnakoski/qb): Qb queries on Bugzilla's ElasticSearch clusters
- [Persona](https://developer.mozilla.org/en-US/Persona): Email authentication service
- [D3-Rickshaw](http://code.shutterstock.com/rickshaw/): Javascript-based graphing tool
- [Twitter Bootstrap](http://getbootstrap.com/getting-started/): Beautiful user interfaces
- [Spectrum](http://bgrins.github.io/spectrum/): Beautiful colourpicker widget
- [Font Awesome](http://fontawesome.io/): Beautiful HTML icons
- [Gridster](http://gridster.net/): Beautiful grid boxes


## License
[Mozilla Public Liscense v2.0](LICENSE)
