## Release Readiness Dashboard
Dashboards for tracking [Release Statuses of Mozillian Awesomeness](https://release-dash.paas.allizom.org).<br>
More awesome *(and possibly unstable)* new features on [the staging site](http://release-dash.williecheong.com).<br>
Change logs, progress updates and latest developments on [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0ApNDjYXWm5JndDFwLWVlM1BPR3dBdjE1ZVdfWlBwR1E&usp=sharing).

#### Requirements
- Standard Web Stack: Apache, MySQL, PHP 5.3 and above
- For deployment on local machine, try LAMP, [MAMP](http://www.mamp.info/en/downloads/) or [WAMP](http://www.wampserver.com/en/). 

#### Configuration
- Define *production*, *staging* and *development* environments in `/index.php`
- Database credentials for *development* in `/application/config/database.php`
- Landing page (base_url) for *development* in `/application/config/config.php`
- Configuration for other environments in `/application/config/[environment]/______.php`
- If neccessary, modify white-listed dashboard administrators in `/assets/sql/schema.sql`

#### Deployment
1. Clone the repository into the web directory
2. Set up a new MySQL database service on the machine
3. Define database credentials as specified in Configuration above
4. Load the database schema and initial data from `/assets/sql/schema.sql`
5. Done: RRDashboard is now live.


## Features
#### Running with the Train
- Checks for new cycle and updates mappings if current cycle not in database.
- Automatically executed when landing page or version pages are accessed.
- Manually execute through `http://release-dash.../admin/update_cycle`
- External dependencies: [CURRENT_CYCLE](https://wiki.mozilla.org/Template:CURRENT_CYCLE), [CENTRAL_VERSION](https://wiki.mozilla.org/Template:CENTRAL_VERSION)

#### Groups of Queries
- Found on version pages to represent individual release readiness metrics.
- Accessed through `http://release-dash.../for/[product_tag]/[version_tag]`
- Every group contains one or more queries; visualized as a plot, a current value, or both.
- *Default groups* apply across all versions of a product. 
- `<version_tag>` and `<version_title>` are neccessary for fields in *default groups* to adapt to version pages.
- *Custom groups* only apply to a single version of a product. 
- `<version_tag>` and `<version_title>` are optional for custom groups. 
- `<birthday>` and `<timestamp>` are recommended for specifying time ranges in Qb queries. 
- Bugzilla URLs for queries can be specified to allow direct Bugzilla access from the dashboard. `<version_tag>` may also be used here if the query belongs to a *default group*.
- Queries may also have a reference. i.e. run same query on an older version.
- External dependencies: [Elasticsearch private cluster](https://github.com/klahnakoski/qb), [Elasticsearch public cluster](https://github.com/klahnakoski/qb)

#### Administration

#### Rules

#### Qb Queries


## Testing
To be continued


## Troubleshoot
To be continued<br>

Reach out to [Willie Cheong](http://williecheong.com) for undocumented problems.


## References
- [CodeIgniter](http://ellislab.com/codeigniter): Server side PHP framework
- [CI RestServer](https://github.com/philsturgeon/codeigniter-restserver): Support for REST APIs on CodeIgniter
- [Qb](https://github.com/klahnakoski/qb): Qb queries on Bugzilla's ElasticSearch clusters
- [D3-Rickshaw](http://code.shutterstock.com/rickshaw/): Javascript-based graphing tool
- [Twitter Bootstrap](http://getbootstrap.com/getting-started/): Beautiful user interfaces
- [Spectrum](http://bgrins.github.io/spectrum/): Beautiful colourpicker widget
- [Font Awesome](http://fontawesome.io/): Beautiful HTML icons
- [Gridster](http://gridster.net/): Beautiful grid boxes


## License
[Mozilla Public Liscense v2.0](LICENSE)
