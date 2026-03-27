package com.marsa.luberight.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Admin", schema = "dbo")
public class Admin {
  @Id
  @Column(name = "[Index]")
  private Integer id;

  @Column(name = "Name")
  private String name;

  @Column(name = "[Interval]")
  private Integer interval;

  @Column(name = "Amount")
  private Integer amount;

  @Column(name = "LubricantIndex")
  private Integer lubricantIndex;

  @Column(name = "Active")
  private Integer active;

  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Integer getInterval() {
    return interval;
  }

  public Integer getAmount() {
    return amount;
  }

  public Integer getLubricantIndex() {
    return lubricantIndex;
  }

  public Integer getActive() {
    return active;
  }
}
